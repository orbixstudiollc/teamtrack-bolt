import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import TwoFactor from "./pages/auth/TwoFactor";

import Dashboard from "./pages/dashboard/Dashboard";
import ActiveTimer from "./pages/dashboard/ActiveTimer";
import TimesheetDaily from "./pages/dashboard/TimesheetDaily";
import TimesheetWeekly from "./pages/dashboard/TimesheetWeekly";
import ManualEntry from "./pages/dashboard/ManualEntry";
import ActivityMonitor from "./pages/dashboard/ActivityMonitor";
import ActivityTimeline from "./pages/dashboard/ActivityTimeline";
import ScreenshotGallery from "./pages/dashboard/ScreenshotGallery";

import LeaveOverview from "./pages/leave/LeaveOverview";
import MyLeaveRequests from "./pages/leave/MyLeaveRequests";
import ApplyLeave from "./pages/leave/ApplyLeave";
import LeaveApproval from "./pages/leave/LeaveApproval";
import TeamCalendar from "./pages/leave/TeamCalendar";

import PayrollOverview from "./pages/payroll/PayrollOverview";
import EmployeePayslips from "./pages/payroll/EmployeePayslips";
import RunPayroll from "./pages/payroll/RunPayroll";
import SalaryStructure from "./pages/payroll/SalaryStructure";
import PayrollHistory from "./pages/payroll/PayrollHistory";

import ProjectsOverview from "./pages/projects/ProjectsOverview";
import SprintBoard from "./pages/projects/SprintBoard";
import TaskList from "./pages/projects/TaskList";
import ProjectTimeline from "./pages/projects/ProjectTimeline";
import DesignReview from "./pages/projects/DesignReview";

import TeamDirectory from "./pages/team/TeamDirectory";
import EmployeeProfile from "./pages/team/EmployeeProfile";
import Departments from "./pages/team/Departments";
import RolesPermissions from "./pages/team/RolesPermissions";
import OrgChart from "./pages/team/OrgChart";

import ReportsDashboard from "./pages/reports/ReportsDashboard";
import AttendanceReport from "./pages/reports/AttendanceReport";
import PayrollSummary from "./pages/reports/PayrollSummary";
import LeaveAnalytics from "./pages/reports/LeaveAnalytics";
import TeamPerformance from "./pages/reports/TeamPerformance";

import GeneralSettings from "./pages/settings/GeneralSettings";
import Notifications from "./pages/settings/Notifications";
import Security from "./pages/settings/Security";
import Integrations from "./pages/settings/Integrations";
import Billing from "./pages/settings/Billing";

import NoProjects from "./pages/states/NoProjects";
import NoTasks from "./pages/states/NoTasks";
import Error404 from "./pages/states/Error404";
import Error500 from "./pages/states/Error500";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="text-primary font-primary text-sm">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/two-factor" element={<TwoFactor />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/timer" element={<ActiveTimer />} />
        <Route path="/dashboard/timesheet/daily" element={<TimesheetDaily />} />
        <Route path="/dashboard/timesheet/weekly" element={<TimesheetWeekly />} />
        <Route path="/dashboard/manual-entry" element={<ManualEntry />} />
        <Route path="/dashboard/activity" element={<ActivityMonitor />} />
        <Route path="/dashboard/activity/timeline" element={<ActivityTimeline />} />
        <Route path="/dashboard/screenshots" element={<ScreenshotGallery />} />

        <Route path="/leave" element={<LeaveOverview />} />
        <Route path="/leave/requests" element={<MyLeaveRequests />} />
        <Route path="/leave/apply" element={<ApplyLeave />} />
        <Route path="/leave/approval" element={<LeaveApproval />} />
        <Route path="/leave/calendar" element={<TeamCalendar />} />

        <Route path="/payroll" element={<PayrollOverview />} />
        <Route path="/payroll/payslips" element={<EmployeePayslips />} />
        <Route path="/payroll/run" element={<RunPayroll />} />
        <Route path="/payroll/salary" element={<SalaryStructure />} />
        <Route path="/payroll/history" element={<PayrollHistory />} />

        <Route path="/projects" element={<ProjectsOverview />} />
        <Route path="/projects/sprint" element={<SprintBoard />} />
        <Route path="/projects/tasks" element={<TaskList />} />
        <Route path="/projects/timeline" element={<ProjectTimeline />} />
        <Route path="/projects/review" element={<DesignReview />} />

        <Route path="/team" element={<TeamDirectory />} />
        <Route path="/team/profile/:id" element={<EmployeeProfile />} />
        <Route path="/team/departments" element={<Departments />} />
        <Route path="/team/roles" element={<RolesPermissions />} />
        <Route path="/team/org-chart" element={<OrgChart />} />

        <Route path="/reports" element={<ReportsDashboard />} />
        <Route path="/reports/attendance" element={<AttendanceReport />} />
        <Route path="/reports/payroll" element={<PayrollSummary />} />
        <Route path="/reports/leave" element={<LeaveAnalytics />} />
        <Route path="/reports/performance" element={<TeamPerformance />} />

        <Route path="/settings" element={<GeneralSettings />} />
        <Route path="/settings/notifications" element={<Notifications />} />
        <Route path="/settings/security" element={<Security />} />
        <Route path="/settings/integrations" element={<Integrations />} />
        <Route path="/settings/billing" element={<Billing />} />

        <Route path="/no-projects" element={<NoProjects />} />
        <Route path="/no-tasks" element={<NoTasks />} />
      </Route>

      <Route path="/500" element={<Error500 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
