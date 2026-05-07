import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Clock, Radio, ClipboardCheck, BarChart3,
  AlertTriangle, MessageCircle, ChevronRight, CheckCircle,
  BookOpen, Calendar, TrendingUp, Award, Zap, Eye
} from 'lucide-react';
import { cn } from '../../components/ui';

const SCHEDULE_TODAY = [
  {
    id: '1',
    name: 'Robotics Basics — Grade 6A',
    course: 'Robotics',
    time: '08:00 – 09:30',
    status: 'completed',
    students: 24,
    attended: 22,
    avgProgress: 72,
    color: 'bg-orange-500',
  },
  {
    id: '2',
    name: 'Python Fundamentals — Grade 7B',
    course: 'Coding',
    time: '10:00 – 11:30',
    status: 'live',
    students: 28,
    attended: 25,
    avgProgress: 58,
    color: 'bg-emerald-500',
  },
  {
    id: '3',
    name: 'AI & Machine Learning — Grade 8',
    course: 'AI',
    time: '13:00 – 14:30',
    status: 'upcoming',
    students: 20,
    attended: 0,
    avgProgress: 45,
    color: 'bg-violet-500',
  },
  {
    id: '4',
    name: 'Arduino Projects — Grade 6B',
    course: 'Robotics',
    time: '15:00 – 16:30',
    status: 'upcoming',
    students: 22,
    attended: 0,
    avgProgress: 61,
    color: 'bg-blue-500',
  },
];

const FLAGGED_STUDENTS = [
  { id: 's1', name: 'Amina Hassan', class: 'Grade 7B', issue: 'Stuck for 45 min on Lesson 4', severity: 'high', avatar: 'https://i.pravatar.cc/150?u=amina' },
  { id: 's2', name: 'Kevin Mwangi', class: 'Grade 6A', issue: 'Missed last 2 classes', severity: 'high', avatar: 'https://i.pravatar.cc/150?u=kevin' },
  { id: 's3', name: 'Fatuma Ochieng', class: 'Grade 8', issue: 'Progress dropped 18% this week', severity: 'medium', avatar: 'https://i.pravatar.cc/150?u=fatuma' },
  { id: 's4', name: 'James Kariuki', class: 'Grade 7B', issue: 'Low engagement in live class', severity: 'medium', avatar: 'https://i.pravatar.cc/150?u=james' },
];

const PENDING_GRADING = [
  { id: 'p1', student: 'Liam Njoroge', project: 'Traffic Light Circuit', course: 'Robotics', daysAgo: 4 },
  { id: 'p2', student: 'Sophia Wanjiku', project: 'Weather App in Python', course: 'Coding', daysAgo: 2 },
  { id: 'p3', student: 'David Otieno', project: 'Image Classifier', course: 'AI', daysAgo: 1 },
];

const STATUS_STYLES: Record<string, string> = {
  completed: 'text-neutral-400 bg-neutral-100',
  live: 'text-emerald-700 bg-emerald-100',
  upcoming: 'text-blue-700 bg-blue-100',
};

const SEVERITY_STYLES: Record<string, string> = {
  high: 'border-red-200 bg-red-50',
  medium: 'border-amber-200 bg-amber-50',
};

export function InstructorDashboard() {
  const [flaggedExpanded, setFlaggedExpanded] = useState(true);
  const liveClass = SCHEDULE_TODAY.find((c) => c.status === 'live');
  const nextClass = SCHEDULE_TODAY.find((c) => c.status === 'upcoming');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-950">Good morning, Ms. Achieng 👋</h1>
          <p className="text-sm text-neutral-500 mt-1">Monday, 4 May 2026 · 4 classes scheduled today</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/instructor/grading"
            className="flex items-center gap-2 h-9 px-3 rounded-md border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <ClipboardCheck size={15} className="text-neutral-400" />
            Grade ({PENDING_GRADING.length})
          </Link>
          <Link
            to="/instructor/live/2"
            className="flex items-center gap-2 h-9 px-4 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            <Radio size={15} />
            Join Live Class
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Classes This Week', value: '8', sub: '+2 from last week', icon: BookOpen, color: 'text-blue-600' },
          { label: 'Total Students', value: '94', sub: 'Across 4 classes', icon: Users, color: 'text-violet-600' },
          { label: 'Avg Engagement', value: '76%', sub: '↑ 4% this week', icon: TrendingUp, color: 'text-emerald-600' },
          { label: 'Pending Grading', value: String(PENDING_GRADING.length), sub: 'Projects to review', icon: ClipboardCheck, color: 'text-amber-600' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-neutral-500">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className="text-2xl font-semibold text-neutral-950">{stat.value}</div>
            <div className="text-xs text-neutral-400 mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white">
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-950">Today's Schedule</h2>
            <Link to="/instructor/classes" className="text-xs text-neutral-500 hover:text-neutral-950 flex items-center gap-1">
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {SCHEDULE_TODAY.map((cls) => (
              <div key={cls.id} className="p-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
                <div className={cn('w-1 h-12 rounded-full shrink-0', cls.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-neutral-900 truncate">{cls.name}</span>
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full shrink-0 capitalize', STATUS_STYLES[cls.status])}>
                      {cls.status === 'live' ? '● Live' : cls.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1"><Clock size={11} />{cls.time}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{cls.students} students</span>
                    {cls.status === 'completed' && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle size={11} />{cls.attended}/{cls.students} attended
                      </span>
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs text-neutral-400 mb-1">Avg Progress</div>
                  <div className="text-sm font-semibold text-neutral-900">{cls.avgProgress}%</div>
                </div>
                {cls.status === 'live' && (
                  <Link
                    to={`/instructor/live/${cls.id}`}
                    className="shrink-0 flex items-center gap-1.5 h-8 px-3 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <Eye size={13} />Monitor
                  </Link>
                )}
                {cls.status === 'upcoming' && (
                  <Link
                    to={`/instructor/live/${cls.id}`}
                    className="shrink-0 flex items-center gap-1.5 h-8 px-3 rounded-md border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-100 transition-colors"
                  >
                    <Zap size={13} />Start
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Flagged Students */}
          <div className="rounded-xl border border-red-200 bg-white">
            <button
              onClick={() => setFlaggedExpanded(!flaggedExpanded)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-500" />
                <span className="text-sm font-semibold text-neutral-950">Flagged Students</span>
                <span className="h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {FLAGGED_STUDENTS.length}
                </span>
              </div>
              <ChevronRight size={14} className={cn('text-neutral-400 transition-transform', flaggedExpanded && 'rotate-90')} />
            </button>
            {flaggedExpanded && (
              <div className="px-4 pb-4 space-y-2">
                {FLAGGED_STUDENTS.map((s) => (
                  <div key={s.id} className={cn('rounded-lg border p-3 flex items-start gap-3', SEVERITY_STYLES[s.severity])}>
                    <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full shrink-0 object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-neutral-900">{s.name}</div>
                      <div className="text-xs text-neutral-500">{s.class}</div>
                      <div className="text-xs text-neutral-600 mt-1">{s.issue}</div>
                    </div>
                    <button className="shrink-0 p-1.5 rounded-md hover:bg-white/70 text-neutral-500 hover:text-neutral-900 transition-colors">
                      <MessageCircle size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Grading */}
          <div className="rounded-xl border border-neutral-200 bg-white">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={15} className="text-amber-500" />
                <span className="text-sm font-semibold text-neutral-950">Pending Grading</span>
              </div>
              <Link to="/instructor/grading" className="text-xs text-neutral-500 hover:text-neutral-950">View all</Link>
            </div>
            <div className="divide-y divide-neutral-100">
              {PENDING_GRADING.map((p) => (
                <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-neutral-900 truncate">{p.project}</div>
                    <div className="text-xs text-neutral-500">{p.student} · {p.course}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn('text-xs font-medium', p.daysAgo >= 3 ? 'text-red-600' : 'text-neutral-400')}>
                      {p.daysAgo}d ago
                    </span>
                    <Link
                      to="/instructor/grading"
                      className="h-7 px-2.5 rounded-md bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800 transition-colors flex items-center"
                    >
                      Grade
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
