import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/student/Dashboard';
import { CourseDetail } from './pages/student/CourseDetail';
import { LessonView } from './pages/student/LessonView';
import { Leaderboard } from './pages/student/Leaderboard';
import { ParentDashboard } from './pages/parent/Dashboard';
import { ChildProgress } from './pages/parent/ChildProgress';
import { Reports } from './pages/parent/Reports';
import { Notifications } from './pages/parent/Notifications';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Immersive Routes (No Layout) */}
        <Route path="/student/lesson/:id" element={<LessonView />} />

        {/* Student Routes */}
        <Route path="/student" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="courses"
            element={<div className="p-4">Courses Page (Coming Soon)</div>} />
          
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route
            path="projects"
            element={<div className="p-4">Projects Page (Coming Soon)</div>} />
          
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<Layout />}>
          <Route index element={<ParentDashboard />} />
          <Route path="progress" element={<ChildProgress />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>);

}