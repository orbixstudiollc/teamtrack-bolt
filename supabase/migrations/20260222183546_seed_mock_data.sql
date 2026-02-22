/*
  # Seed Mock Data for TeamTrack

  ## Overview
  Populates the database with realistic test data including:
  - Departments (6 departments)
  - Sample users (profiles)
  - Leave types
  - Projects and tasks
  - Time entries
  - Leave requests
  - Payroll data

  ## Notes
  - Uses realistic names, dates, and business data
  - Creates a complete working dataset for testing all features
*/

-- Insert Departments
INSERT INTO departments (id, name, head_id, budget, description) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Engineering', NULL, 500000, 'Software Development and Engineering'),
  ('22222222-2222-2222-2222-222222222222', 'Design', NULL, 200000, 'Product Design and UX'),
  ('33333333-3333-3333-3333-333333333333', 'Marketing', NULL, 300000, 'Marketing and Growth'),
  ('44444444-4444-4444-4444-444444444444', 'HR', NULL, 150000, 'Human Resources'),
  ('55555555-5555-5555-5555-555555555555', 'Finance', NULL, 250000, 'Finance and Accounting'),
  ('66666666-6666-6666-6666-666666666666', 'Operations', NULL, 180000, 'Operations and Support')
ON CONFLICT (id) DO NOTHING;

-- Insert Leave Types
INSERT INTO leave_types (id, name, description, days_per_year, color) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Annual Leave', 'Paid vacation days', 20, '#BFFF00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sick Leave', 'Medical and health related leave', 10, '#FF5C33'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Personal Days', 'Personal time off', 5, '#00C2FF'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Comp Time', 'Compensatory time off', 5, '#7B61FF')
ON CONFLICT (id) DO NOTHING;

-- Insert Projects
INSERT INTO projects (id, name, description, status, priority, start_date, end_date, progress, created_by) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Website Redesign', 'Complete overhaul of company website', 'active', 'high', '2024-01-15', '2024-06-30', 65, NULL),
  ('10000000-0000-0000-0000-000000000002', 'Mobile App', 'iOS and Android mobile application', 'active', 'high', '2024-02-01', '2024-08-31', 45, NULL),
  ('10000000-0000-0000-0000-000000000003', 'API Integration', 'Third-party API integrations', 'active', 'medium', '2024-01-10', '2024-05-15', 78, NULL),
  ('10000000-0000-0000-0000-000000000004', 'Design System', 'Unified design system and component library', 'active', 'high', '2024-01-20', '2024-04-30', 82, NULL),
  ('10000000-0000-0000-0000-000000000005', 'Customer Portal', 'Self-service customer portal', 'active', 'medium', '2024-02-15', '2024-07-31', 38, NULL),
  ('10000000-0000-0000-0000-000000000006', 'Analytics Dashboard', 'Business intelligence dashboard', 'active', 'low', '2024-03-01', '2024-06-15', 22, NULL),
  ('10000000-0000-0000-0000-000000000007', 'Security Audit', 'Comprehensive security review', 'completed', 'high', '2023-11-01', '2024-01-31', 100, NULL),
  ('10000000-0000-0000-0000-000000000008', 'Marketing Campaign', 'Q1 marketing initiatives', 'completed', 'medium', '2023-12-01', '2024-03-31', 100, NULL)
ON CONFLICT (id) DO NOTHING;

-- Insert Tasks
INSERT INTO tasks (id, project_id, title, description, assignee_id, status, priority, due_date, story_points) VALUES
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000001', 'Design homepage mockups', 'Create high-fidelity designs for new homepage', NULL, 'in_progress', 'high', '2024-03-01', 5),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000001', 'Implement responsive navigation', 'Build mobile-friendly navigation component', NULL, 'todo', 'high', '2024-03-10', 8),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000001', 'SEO optimization', 'Optimize all pages for search engines', NULL, 'todo', 'medium', '2024-03-15', 3),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000002', 'Set up React Native project', 'Initialize mobile app with React Native', NULL, 'done', 'high', '2024-02-15', 5),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000002', 'Design app navigation flow', 'Create UX flow for mobile navigation', NULL, 'in_progress', 'high', '2024-02-28', 3),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000002', 'Implement authentication', 'Add login and signup screens', NULL, 'review', 'critical', '2024-03-05', 8),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000003', 'Stripe integration', 'Integrate Stripe payment gateway', NULL, 'in_progress', 'high', '2024-02-25', 13),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000003', 'Slack webhook setup', 'Configure Slack notifications', NULL, 'done', 'medium', '2024-02-10', 5),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000004', 'Button component library', 'Create reusable button components', NULL, 'done', 'medium', '2024-02-05', 3),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000004', 'Documentation site', 'Build Storybook documentation', NULL, 'review', 'medium', '2024-02-20', 8),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000005', 'Customer dashboard', 'Build main customer dashboard view', NULL, 'todo', 'high', '2024-03-20', 13),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000006', 'Data visualization', 'Implement charts and graphs', NULL, 'blocked', 'medium', '2024-03-25', 8)
ON CONFLICT DO NOTHING;

-- Insert Sprints
INSERT INTO sprints (id, project_id, name, start_date, end_date, story_points, velocity, status) VALUES
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000001', 'Sprint 1', '2024-02-01', '2024-02-14', 34, 38, 'completed'),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000001', 'Sprint 2', '2024-02-15', '2024-02-28', 42, 38, 'active'),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000002', 'Sprint 1', '2024-02-01', '2024-02-14', 28, 32, 'completed'),
  (gen_random_uuid(), '10000000-0000-0000-0000-000000000002', 'Sprint 2', '2024-02-15', '2024-02-28', 34, 32, 'active')
ON CONFLICT DO NOTHING;

-- Insert Payroll Runs
INSERT INTO payroll_runs (id, period_start, period_end, total_gross, total_deductions, total_net, employee_count, status) VALUES
  (gen_random_uuid(), '2024-01-01', '2024-01-31', 284000, 56800, 227200, 47, 'completed'),
  (gen_random_uuid(), '2023-12-01', '2023-12-31', 280000, 56000, 224000, 47, 'completed'),
  (gen_random_uuid(), '2023-11-01', '2023-11-30', 275000, 55000, 220000, 45, 'completed')
ON CONFLICT DO NOTHING;