import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Award, Clock, BarChart3 } from 'lucide-react';
import { cn } from '../../components/ui';

const CLASSES = [
  { id: 'c1', name: 'Python Fundamentals', grade: 'Grade 7B', students: 28, avgProgress: 58, avgScore: 71, attendance: 86, engagement: 72, color: 'bg-emerald-500', trend: +4 },
  { id: 'c2', name: 'Robotics Basics', grade: 'Grade 6A', students: 24, avgProgress: 72, avgScore: 79, attendance: 91, engagement: 84, color: 'bg-orange-500', trend: +7 },
  { id: 'c3', name: 'AI & Machine Learning', grade: 'Grade 8', students: 20, avgProgress: 45, avgScore: 63, attendance: 78, engagement: 61, color: 'bg-violet-500', trend: -3 },
  { id: 'c4', name: 'Arduino Projects', grade: 'Grade 6B', students: 22, avgProgress: 61, avgScore: 74, attendance: 88, engagement: 79, color: 'bg-blue-500', trend: +2 },
];

const WEEKLY_PROGRESS = [
  { week: 'Week 1', python: 12, robotics: 18, ai: 8, arduino: 14 },
  { week: 'Week 2', python: 24, robotics: 32, ai: 15, arduino: 26 },
  { week: 'Week 3', python: 38, robotics: 48, ai: 24, arduino: 38 },
  { week: 'Week 4', python: 51, robotics: 62, ai: 33, arduino: 51 },
  { week: 'Week 5', python: 58, robotics: 72, ai: 45, arduino: 61 },
];

const TOP_STUDENTS = [
  { name: 'Cynthia Waweru', class: 'Python', score: 95, avatar: 'https://i.pravatar.cc/150?u=cynthia' },
  { name: 'Hassan Abdi', class: 'Python', score: 91, avatar: 'https://i.pravatar.cc/150?u=hassan' },
  { name: 'Irene Chebet', class: 'Robotics', score: 89, avatar: 'https://i.pravatar.cc/150?u=irene' },
  { name: 'Brian Otieno', class: 'Robotics', score: 87, avatar: 'https://i.pravatar.cc/150?u=brian' },
  { name: 'Kevin Mwangi', class: 'AI', score: 85, avatar: 'https://i.pravatar.cc/150?u=kevin' },
];

const AT_RISK = [
  { name: 'Amina Hassan', class: 'Python', issue: 'Low progress + stuck', risk: 'high', avatar: 'https://i.pravatar.cc/150?u=amina' },
  { name: 'Grace Muthoni', class: 'Python', issue: 'Attendance < 75%', risk: 'high', avatar: 'https://i.pravatar.cc/150?u=grace2' },
  { name: 'Fatuma Ochieng', class: 'AI', issue: 'Declining scores', risk: 'medium', avatar: 'https://i.pravatar.cc/150?u=fatuma' },
  { name: 'James Kariuki', class: 'Python', issue: 'Idle in class frequently', risk: 'medium', avatar: 'https://i.pravatar.cc/150?u=james' },
];

const maxBarValue = 100;

export function Analytics() {
  const [selectedClass, setSelectedClass] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/instructor" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-950 transition-colors">
          <ArrowLeft size={15} />Back
        </Link>
        <h1 className="text-xl font-semibold text-neutral-950">Analytics</h1>
      </div>

      {/* Class Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedClass('all')}
          className={cn('h-8 px-4 rounded-full text-xs font-medium transition-colors', selectedClass === 'all' ? 'bg-neutral-950 text-white' : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50')}
        >
          All Classes
        </button>
        {CLASSES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClass(c.id)}
            className={cn('h-8 px-4 rounded-full text-xs font-medium transition-colors', selectedClass === c.id ? 'bg-neutral-950 text-white' : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50')}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Class Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CLASSES.map((c) => (
          <div key={c.id} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className={cn('w-2.5 h-2.5 rounded-full', c.color)} />
              <span className="text-xs font-medium text-neutral-700 truncate">{c.name}</span>
            </div>
            <div className="text-xs text-neutral-400 mb-4">{c.grade} · {c.students} students</div>
            <div className="space-y-2.5">
              {[
                { label: 'Avg Progress', value: c.avgProgress },
                { label: 'Avg Score', value: c.avgScore },
                { label: 'Attendance', value: c.attendance },
                { label: 'Engagement', value: c.engagement },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-500">{m.label}</span>
                    <span className="font-medium text-neutral-900">{m.value}%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-1.5 rounded-full', m.value >= 75 ? 'bg-emerald-500' : m.value >= 50 ? 'bg-amber-500' : 'bg-red-500')}
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={cn('flex items-center gap-1 mt-3 text-xs font-medium', c.trend > 0 ? 'text-emerald-600' : 'text-red-600')}>
              {c.trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(c.trend)}% this week
            </div>
          </div>
        ))}
      </div>

      {/* Progress Chart (pure CSS bar chart) */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-neutral-950 mb-5">Weekly Progress Trend</h3>
        <div className="flex items-end gap-4 h-40 overflow-x-auto pb-2">
          {WEEKLY_PROGRESS.map((week) => (
            <div key={week.week} className="flex flex-col items-center gap-1 shrink-0 flex-1 min-w-[60px]">
              <div className="flex items-end gap-0.5 h-32 w-full justify-center">
                {[
                  { val: week.python, color: 'bg-emerald-400' },
                  { val: week.robotics, color: 'bg-orange-400' },
                  { val: week.ai, color: 'bg-violet-400' },
                  { val: week.arduino, color: 'bg-blue-400' },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className={cn('w-3 rounded-t-sm transition-all', bar.color)}
                    style={{ height: `${(bar.val / maxBarValue) * 100}%` }}
                    title={`${bar.val}%`}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-400">{week.week}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {[
            { label: 'Python', color: 'bg-emerald-400' },
            { label: 'Robotics', color: 'bg-orange-400' },
            { label: 'AI', color: 'bg-violet-400' },
            { label: 'Arduino', color: 'bg-blue-400' },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-xs text-neutral-500">
              <span className={cn('w-3 h-3 rounded-sm', l.color)} />{l.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Students */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award size={15} className="text-amber-500" />
            <h3 className="text-sm font-semibold text-neutral-950">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {TOP_STUDENTS.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className={cn('w-6 text-center text-xs font-bold', i === 0 ? 'text-amber-500' : i === 1 ? 'text-neutral-400' : 'text-amber-700')}>
                  #{i + 1}
                </div>
                <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-900 truncate">{s.name}</div>
                  <div className="text-xs text-neutral-500">{s.class}</div>
                </div>
                <div className="text-sm font-semibold text-emerald-700">{s.score}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* At-Risk Students */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users size={15} className="text-red-500" />
            <h3 className="text-sm font-semibold text-neutral-950">Students Needing Attention</h3>
          </div>
          <div className="space-y-3">
            {AT_RISK.map((s) => (
              <div key={s.name} className={cn('flex items-center gap-3 p-3 rounded-lg border', s.risk === 'high' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50')}>
                <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-900 truncate">{s.name}</div>
                  <div className="text-xs text-neutral-500">{s.class} · {s.issue}</div>
                </div>
                <Link
                  to="/instructor/students/s1"
                  className="text-xs font-medium text-neutral-700 hover:text-neutral-950 shrink-0"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
