import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  position?: string;
  department_id?: string;
  role: string;
  hire_date?: string;
  employment_type?: string;
  status: string;
  reports_to?: string;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  status: string;
  priority: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  progress: number;
  created_by?: string;
  team_members: string[];
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  project_id?: string;
  title: string;
  description?: string;
  assignee_id?: string;
  status: string;
  priority: string;
  due_date?: string;
  completed_at?: string;
  tags: string[];
  story_points?: number;
  created_at: string;
  updated_at: string;
};

export type LeaveRequest = {
  id: string;
  user_id: string;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  duration: number;
  half_day: boolean;
  reason?: string;
  status: string;
  approver_id?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
};

export type TimeEntry = {
  id: string;
  user_id: string;
  project_id?: string;
  task_id?: string;
  start_time: string;
  end_time?: string;
  duration?: string;
  description?: string;
  billable: boolean;
  activity_level: number;
  created_at: string;
  updated_at: string;
};
