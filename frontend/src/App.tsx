import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/Layout';
import { PlaceholderPage } from './components/ui';

import { Login } from './pages/Login';

import { Dashboard } from './pages/student/Dashboard';
import { CourseDetail } from './pages/student/CourseDetail';
import { LessonView } from './pages/student/LessonView';
import { Leaderboard } from './pages/student/Leaderboard';

import { ParentDashboard } from './pages/parent/Dashboard';
import { ChildProgress } from './pages/parent/ChildProgress';
import { Reports } from './pages/parent/Reports';
import { Notifications } from './pages/parent/Notifications';

import { InstructorDashboard } from './pages/instructor/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';

import { StudentsPage } from './pages/admin/Students';
import { InstructorsPage } from './pages/admin/Instructors';
import { ClassesPage } from './pages/admin/Classes';
import { ReportsPage } from './pages/admin/Reports';
import { BillingPage } from './pages/admin/Billing';
import { SettingsPage } from './pages/admin/Settings';

import { LiveClassMonitor } from './pages/instructor/LiveClass';
import { StudentDetail } from './pages/instructor/StudentDetail';
import { ProjectGrading } from './pages/instructor/ProjectGrading';
import { Analytics } from './pages/instructor/Analytics';

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role || '')) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        {/* LESSON VIEW */}
        <Route
          path="/student/lesson/:id"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <LessonView />
            </ProtectedRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route
            path="courses"
            element={<PlaceholderPage title="Courses" />}
          />

          <Route path="courses/:id" element={<CourseDetail />} />

          <Route
            path="projects"
            element={<PlaceholderPage title="Projects" />}
          />

          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>

        {/* PARENT */}
        <Route
          path="/parent"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ParentDashboard />} />
          <Route path="progress" element={<ChildProgress />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* INSTRUCTOR */}
        <Route
          path="/instructor/live/:classId"
          element={
            <ProtectedRoute allowedRoles={['admin', 'instructor']}>
              <LiveClassMonitor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRoles={['admin', 'instructor']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<InstructorDashboard />} />

          <Route
            path="classes"
            element={<PlaceholderPage title="Classes" />}
          />

          <Route path="grading" element={<ProjectGrading />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="students/:id" element={<StudentDetail />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="students" element={<StudentsPage />} />

          <Route path="instructors" element={<InstructorsPage />} />

          <Route path="classes" element={<ClassesPage />} />

          <Route path="reports" element={<ReportsPage />} />

          <Route path="billing" element={<BillingPage />} />

          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}