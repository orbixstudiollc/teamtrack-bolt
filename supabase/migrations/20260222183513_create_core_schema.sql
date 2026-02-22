/*
  # Create Core TeamTrack Database Schema

  ## Overview
  Complete database schema for TeamTrack HR/Workforce Management system including
  user management, projects, tasks, leave, payroll, timesheets, and team structure.

  ## New Tables
  
  ### Users & Authentication
  - `profiles` - Extended user profile information
  - `departments` - Company departments
  
  ### Projects & Tasks
  - `projects` - Project management
  - `tasks` - Task tracking
  - `sprints` - Agile sprints

  ### Time Tracking
  - `time_entries` - Time tracking records
  - `screenshots` - Activity screenshots

  ### Leave Management
  - `leave_types` - Types of leave
  - `leave_balances` - Employee leave balances
  - `leave_requests` - Leave applications

  ### Payroll
  - `salary_structures` - Salary components
  - `payroll_runs` - Payroll processing records
  - `payslips` - Individual payslips

  ### Reports & Analytics
  - `attendance_records` - Daily attendance

  ## Security
  - Enable RLS on all tables
  - Policies for authenticated users based on roles
*/

-- Departments (create first, no dependencies)
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  head_id uuid,
  budget numeric(12,2),
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view departments"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

-- Profiles (depends on departments)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  phone text,
  position text,
  department_id uuid REFERENCES departments(id),
  role text DEFAULT 'member',
  hire_date date,
  employment_type text DEFAULT 'full_time',
  status text DEFAULT 'active',
  reports_to uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Now update departments policy
CREATE POLICY "Admins can manage departments"
  ON departments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text DEFAULT 'active',
  priority text DEFAULT 'medium',
  start_date date,
  end_date date,
  budget numeric(12,2),
  progress integer DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  team_members jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage all projects"
  ON projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'manager')
    )
  );

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  assignee_id uuid REFERENCES auth.users(id),
  status text DEFAULT 'todo',
  priority text DEFAULT 'medium',
  due_date date,
  completed_at timestamptz,
  tags jsonb DEFAULT '[]',
  story_points integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage all tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'manager')
    )
  );

-- Sprints
CREATE TABLE IF NOT EXISTS sprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  story_points integer DEFAULT 0,
  velocity integer DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sprints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view sprints"
  ON sprints FOR SELECT
  TO authenticated
  USING (true);

-- Time Entries
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  project_id uuid REFERENCES projects(id),
  task_id uuid REFERENCES tasks(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  duration interval,
  description text,
  billable boolean DEFAULT true,
  activity_level integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own time entries"
  ON time_entries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own time entries"
  ON time_entries FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Managers can view all time entries"
  ON time_entries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'manager')
    )
  );

-- Screenshots
CREATE TABLE IF NOT EXISTS screenshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  time_entry_id uuid REFERENCES time_entries(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  image_url text,
  activity_level integer DEFAULT 0,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own screenshots"
  ON screenshots FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Leave Types
CREATE TABLE IF NOT EXISTS leave_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  days_per_year integer NOT NULL,
  color text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leave_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view leave types"
  ON leave_types FOR SELECT
  TO authenticated
  USING (true);

-- Leave Balances
CREATE TABLE IF NOT EXISTS leave_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  leave_type_id uuid REFERENCES leave_types(id) NOT NULL,
  total_days numeric(5,1) NOT NULL,
  used_days numeric(5,1) DEFAULT 0,
  remaining_days numeric(5,1),
  year integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, leave_type_id, year)
);

ALTER TABLE leave_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own leave balance"
  ON leave_balances FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Leave Requests
CREATE TABLE IF NOT EXISTS leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  leave_type_id uuid REFERENCES leave_types(id) NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  duration numeric(5,1) NOT NULL,
  half_day boolean DEFAULT false,
  reason text,
  status text DEFAULT 'pending',
  approver_id uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own leave requests"
  ON leave_requests FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own leave requests"
  ON leave_requests FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Salary Structures
CREATE TABLE IF NOT EXISTS salary_structures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  base_salary numeric(12,2) NOT NULL,
  earnings jsonb DEFAULT '[]',
  deductions jsonb DEFAULT '[]',
  net_salary numeric(12,2) NOT NULL,
  effective_from date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE salary_structures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own salary"
  ON salary_structures FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Payroll Runs
CREATE TABLE IF NOT EXISTS payroll_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start date NOT NULL,
  period_end date NOT NULL,
  total_gross numeric(12,2) DEFAULT 0,
  total_deductions numeric(12,2) DEFAULT 0,
  total_net numeric(12,2) DEFAULT 0,
  employee_count integer DEFAULT 0,
  status text DEFAULT 'draft',
  processed_at timestamptz,
  processed_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view payroll runs"
  ON payroll_runs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Payslips
CREATE TABLE IF NOT EXISTS payslips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_run_id uuid REFERENCES payroll_runs(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  gross_pay numeric(12,2) NOT NULL,
  deductions numeric(12,2) DEFAULT 0,
  net_pay numeric(12,2) NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  status text DEFAULT 'processed',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payslips"
  ON payslips FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Attendance Records
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  date date NOT NULL,
  status text NOT NULL,
  check_in timestamptz,
  check_out timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attendance"
  ON attendance_records FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_user ON time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_user ON leave_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);
CREATE INDEX IF NOT EXISTS idx_payslips_user ON payslips(user_id);