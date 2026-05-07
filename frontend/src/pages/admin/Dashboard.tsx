import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, BookOpen, UserCheck, DollarSign, TrendingUp,
  TrendingDown, AlertTriangle, CheckCircle, Plus, FileText,
  Megaphone, Calendar
} from 'lucide-react';
import { cn } from '../../components/ui';

const KPI_CARDS = [
  { label: 'Total Students', value: '312', trend: '+18', up: true, icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Classes', value: '24', trend: '+3', up: true, icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Instructors', value: '12', trend: '0', up: true, icon: UserCheck, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Revenue This Term', value: 'KES 842K', trend: '+12%', up: true, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Avg Engagement', value: '74%', trend: '-2%', up: false, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const ENROLLMENT_TREND = [
  { month: 'Jan', students: 210 },
  { month: 'Feb', students: 228 },
  { month: 'Mar', students: 245 },
  { month: 'Apr', students: 270 },
  { month: 'May', students: 312 },
];

const COURSE_POPULARITY = [
  { name: 'Robotics', students: 98, color: 'bg-orange-500', pct: 98 },
  { name: 'Python Coding', students: 87, color: 'bg-emerald-500', pct: 87 },
  { name: 'AI & ML', students: 72, color: 'bg-violet-500', pct: 72 },
  { name: 'Web Dev', students: 55, color: 'bg-blue-500', pct: 55 },
];

const RECENT_ACTIVITY = [
  { type: 'enrollment', text: 'Liam Njoroge enrolled in Robotics Basics', time: '2 min ago', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
  { type: 'completion', text: 'Grade 7B completed Python Module 3', time: '1 hr ago', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  { type: 'alert', text: '3 students flagged as at-risk this week', time: '3 hr ago', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
  { type: 'invoice', text: 'Invoice #INV-044 is overdue — St. Mary\'s', time: '1 day ago', icon: DollarSign, color: 'text-amber-600 bg-amber-50' },
  { type: 'enrollment', text: 'Fatuma Ochieng enrolled in AI Introduction', time: '1 day ago', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
];

const SYSTEM_ALERTS = [
  { level: 'red', msg: '5 students have attendance below 75%' },
  { level: 'amber', msg: 'Invoice #INV-044 overdue by 4 days' },
  { level: 'amber', msg: '3 projects pending grading for over 5 days' },
];

const maxEnrollment = Math.max(...ENROLLMENT_TREND.map((d) => d.students));

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-950">School Overview</h1>
          <p className="text-sm text-neutral-500 mt-1">Tinkacode Academy · Term 2, 2026</p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/students" className="flex items-center gap-2 h-9 px-3 rounded-md border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
            <Plus size={14} />Enroll Student
          </Link>
          <Link to="/admin/reports" className="flex items-center gap-2 h-9 px-4 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
            <FileText size={14} />Generate Report
          </Link>
        </div>
      </div>

      {SYSTEM_ALERTS.length > 0 && (
        <div className="space-y-2">
          {SYSTEM_ALERTS.map((a, i) => (
            <div key={i} className={cn('flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm', a.level === 'red' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-800')}>
              <AlertTriangle size={14} className="shrink-0" />{a.msg}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {KPI_CARDS.map((k) => (
          <div key={k.label} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', k.bg)}>
                <k.icon size={16} className={k.color} />
              </div>
              <span className={cn('text-xs font-medium flex items-center gap-0.5', k.up ? 'text-emerald-600' : 'text-red-500')}>
                {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{k.trend}
              </span>
            </div>
            <div className="text-xl font-bold text-neutral-950">{k.value}</div>
            <div className="text-xs text-neutral-500 mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-neutral-950">Student Enrollment Trend</h2>
            <span className="text-xs text-neutral-400">Last 5 months</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {ENROLLMENT_TREND.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs font-medium text-neutral-700">{d.students}</span>
                <div className="w-full rounded-t-md bg-neutral-950 transition-all" style={{ height: `${(d.students / maxEnrollment) * 100}%` }} />
                <span className="text-xs text-neutral-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-950 mb-5">Course Popularity</h2>
          <div className="space-y-4">
            {COURSE_POPULARITY.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-neutral-800">{c.name}</span>
                  <span className="text-neutral-500">{c.students} students</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className={cn('h-2 rounded-full', c.color)} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-neutral-200 bg-white">
          <div className="p-5 border-b border-neutral-100">
            <h2 className="text-sm font-semibold text-neutral-950">Recent Activity</h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0', a.color)}>
                  <a.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-800 truncate">{a.text}</p>
                  <p className="text-xs text-neutral-400">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-950 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Enroll Student', icon: GraduationCap, to: '/admin/students', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
              { label: 'Create Class', icon: Calendar, to: '/admin/classes', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
              { label: 'Generate Report', icon: FileText, to: '/admin/reports', color: 'bg-violet-50 text-violet-700 hover:bg-violet-100' },
              { label: 'Send Announcement', icon: Megaphone, to: '/admin', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
              { label: 'View Billing', icon: DollarSign, to: '/admin/billing', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
              { label: 'Manage Instructors', icon: UserCheck, to: '/admin/instructors', color: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200' },
            ].map((action) => (
              <Link key={action.label} to={action.to} className={cn('flex items-center gap-2.5 p-3.5 rounded-xl text-sm font-medium transition-colors', action.color)}>
                <action.icon size={16} />{action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
