import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, TrendingUp, TrendingDown, Clock, CheckCircle,
  AlertTriangle, MessageCircle, Flag, Calendar, Award,
  BarChart3, BookOpen, FolderOpen, ChevronRight, Star
} from 'lucide-react';
import { cn } from '../../components/ui';

const STUDENT = {
  id: 's1',
  name: 'Amina Hassan',
  avatar: 'https://i.pravatar.cc/150?u=amina',
  grade: 'Grade 7B',
  admissionNo: 'TKC-2024-0142',
  riskLevel: 'high' as const,
  parent: { name: 'Halima Hassan', phone: '+254 712 345 678', email: 'halima.hassan@gmail.com' },
  overallProgress: 42,
  classAvg: 61,
  streak: 3,
  points: 1240,
  joinDate: 'Sep 2024',
};

const COURSES = [
  { id: 'c1', name: 'Python Fundamentals', progress: 42, grade: 'C+', color: 'bg-emerald-500', lessons: 14, completed: 6 },
  { id: 'c2', name: 'Robotics Basics', progress: 68, grade: 'B', color: 'bg-orange-500', lessons: 12, completed: 8 },
  { id: 'c3', name: 'AI Introduction', progress: 25, grade: 'D+', color: 'bg-violet-500', lessons: 10, completed: 2 },
];

const PROJECTS = [
  { id: 'p1', name: 'Traffic Light Circuit', course: 'Robotics', status: 'graded', score: 78, submittedAt: '2 Apr 2026', feedback: 'Good use of components, timing logic needs improvement.' },
  { id: 'p2', name: 'Weather App', course: 'Python', status: 'submitted', score: null, submittedAt: '1 May 2026', feedback: null },
  { id: 'p3', name: 'Line Follower Bot', course: 'Robotics', status: 'in_progress', score: null, submittedAt: null, feedback: null },
];

const ATTENDANCE = {
  present: 14, absent: 4, late: 2, total: 20,
  calendar: [
    { date: '7 Apr', status: 'present' }, { date: '9 Apr', status: 'present' }, { date: '14 Apr', status: 'absent' },
    { date: '16 Apr', status: 'present' }, { date: '21 Apr', status: 'late' }, { date: '23 Apr', status: 'present' },
    { date: '28 Apr', status: 'absent' }, { date: '30 Apr', status: 'present' }, { date: '5 May', status: 'present' },
  ],
};

const FEEDBACK_HISTORY = [
  { id: 'f1', type: 'concern', text: 'Amina is struggling with for loop logic. Recommend extra practice.', date: '28 Apr', author: 'Ms. Achieng', visibility: 'parent' },
  { id: 'f2', type: 'praise', text: 'Excellent work on the circuit assembly today!', date: '21 Apr', author: 'Ms. Achieng', visibility: 'student' },
];

const STATUS_COLORS: Record<string, string> = {
  present: 'bg-emerald-500',
  absent: 'bg-red-500',
  late: 'bg-amber-500',
};

const PROJECT_BADGES: Record<string, string> = {
  graded: 'text-emerald-700 bg-emerald-100',
  submitted: 'text-blue-700 bg-blue-100',
  in_progress: 'text-neutral-600 bg-neutral-100',
};

export function StudentDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'progress' | 'projects' | 'attendance' | 'feedback'>('progress');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<'praise' | 'concern' | 'suggestion'>('praise');
  const [feedbackVisibility, setFeedbackVisibility] = useState<'student' | 'parent' | 'both'>('both');

  const TABS = [
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link to="/instructor" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-950 transition-colors">
        <ArrowLeft size={15} />Back to Dashboard
      </Link>

      {/* Profile Header */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <div className="relative shrink-0">
            <img src={STUDENT.avatar} alt={STUDENT.name} className="w-16 h-16 rounded-full object-cover" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center">
              <AlertTriangle size={10} className="text-white" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <h1 className="text-xl font-semibold text-neutral-950">{STUDENT.name}</h1>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">At Risk</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500 mb-4">
              <span>{STUDENT.grade}</span>
              <span>{STUDENT.admissionNo}</span>
              <span>Joined {STUDENT.joinDate}</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-1.5 text-center">
                <div className="font-semibold text-neutral-950">{STUDENT.overallProgress}%</div>
                <div className="text-xs text-neutral-500">Progress</div>
              </div>
              <div className="rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-1.5 text-center">
                <div className="font-semibold text-neutral-950">{STUDENT.streak}</div>
                <div className="text-xs text-neutral-500">Day Streak</div>
              </div>
              <div className="rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-1.5 text-center">
                <div className="font-semibold text-neutral-950">{STUDENT.points}</div>
                <div className="text-xs text-neutral-500">Points</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-md border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
              <MessageCircle size={14} />Message Parent
            </button>
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-md border border-red-200 text-sm text-red-700 hover:bg-red-50 transition-colors">
              <Flag size={14} />Flag
            </button>
          </div>
        </div>

        {/* Parent Info */}
        <div className="mt-5 pt-5 border-t border-neutral-100 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span className="text-neutral-500">Parent: <span className="text-neutral-900 font-medium">{STUDENT.parent.name}</span></span>
          <span className="text-neutral-500">{STUDENT.parent.phone}</span>
          <span className="text-neutral-500">{STUDENT.parent.email}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-neutral-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
              activeTab === tab.id
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-500 hover:text-neutral-950'
            )}
          >
            <tab.icon size={14} />{tab.label}
          </button>
        ))}
      </div>

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-4">
          {/* vs Class Average */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-950 mb-4">Progress vs Class Average</h3>
            <div className="space-y-4">
              {COURSES.map((c) => (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={cn('w-2 h-2 rounded-full', c.color)} />
                      <span className="text-sm font-medium text-neutral-900">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-500">{c.completed}/{c.lessons} lessons</span>
                      <span className="text-sm font-semibold text-neutral-950">{c.progress}%</span>
                      <span className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded',
                        c.progress >= 70 ? 'bg-emerald-100 text-emerald-700' : c.progress >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      )}>{c.grade}</span>
                    </div>
                  </div>
                  <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className={cn('h-2 rounded-full', c.color)} style={{ width: `${c.progress}%` }} />
                    {/* Class avg line */}
                    <div className="absolute top-0 bottom-0 w-0.5 bg-neutral-400/60" style={{ left: `${STUDENT.classAvg}%` }} />
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Class avg: {STUDENT.classAvg}% · Student: {c.progress}%
                    {c.progress < STUDENT.classAvg
                      ? <span className="text-red-500 ml-2 inline-flex items-center gap-0.5"><TrendingDown size={10} />{STUDENT.classAvg - c.progress}% below avg</span>
                      : <span className="text-emerald-600 ml-2 inline-flex items-center gap-0.5"><TrendingUp size={10} />{c.progress - STUDENT.classAvg}% above avg</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-3">
          {PROJECTS.map((p) => (
            <div key={p.id} className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-neutral-950">{p.name}</span>
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', PROJECT_BADGES[p.status])}>
                      {p.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">{p.course}{p.submittedAt && ` · Submitted ${p.submittedAt}`}</div>
                  {p.feedback && <p className="text-xs text-neutral-600 mt-2 bg-neutral-50 rounded-md px-3 py-2">{p.feedback}</p>}
                </div>
                {p.score !== null && (
                  <div className="shrink-0 text-right">
                    <div className={cn('text-xl font-bold', p.score >= 70 ? 'text-emerald-600' : p.score >= 50 ? 'text-amber-600' : 'text-red-600')}>
                      {p.score}%
                    </div>
                  </div>
                )}
                {p.status === 'submitted' && (
                  <Link
                    to="/instructor/grading"
                    className="shrink-0 h-8 px-3 rounded-md bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800 transition-colors flex items-center"
                  >
                    Grade
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Present', value: ATTENDANCE.present, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
              { label: 'Absent', value: ATTENDANCE.absent, color: 'text-red-700 bg-red-50 border-red-200' },
              { label: 'Late', value: ATTENDANCE.late, color: 'text-amber-700 bg-amber-50 border-amber-200' },
              { label: 'Attendance Rate', value: `${Math.round((ATTENDANCE.present / ATTENDANCE.total) * 100)}%`, color: 'text-blue-700 bg-blue-50 border-blue-200' },
            ].map((s) => (
              <div key={s.label} className={cn('rounded-xl border p-4 text-center', s.color)}>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-950 mb-4">Recent Classes</h3>
            <div className="flex flex-wrap gap-2">
              {ATTENDANCE.calendar.map((day) => (
                <div key={day.date} className="flex flex-col items-center gap-1.5">
                  <div className={cn('w-8 h-8 rounded-full', STATUS_COLORS[day.status])} />
                  <span className="text-[10px] text-neutral-400">{day.date.split(' ')[0]}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" />Present</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500" />Absent</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" />Late</span>
            </div>
            {(ATTENDANCE.absent / ATTENDANCE.total) > 0.2 && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 flex items-center gap-2 text-sm text-red-700">
                <AlertTriangle size={14} />
                Attendance below 80% — student may be at academic risk.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* History */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-950 mb-4">Feedback History</h3>
            <div className="space-y-3">
              {FEEDBACK_HISTORY.map((f) => (
                <div
                  key={f.id}
                  className={cn(
                    'rounded-lg border p-4',
                    f.type === 'praise' ? 'bg-emerald-50 border-emerald-200' :
                    f.type === 'concern' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full capitalize',
                      f.type === 'praise' ? 'bg-emerald-100 text-emerald-700' :
                      f.type === 'concern' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    )}>{f.type}</span>
                    <span className="text-xs text-neutral-400">{f.date}</span>
                  </div>
                  <p className="text-sm text-neutral-700">{f.text}</p>
                  <div className="text-xs text-neutral-400 mt-2">Visible to: {f.visibility}</div>
                </div>
              ))}
            </div>
          </div>

          {/* New Feedback */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-950 mb-4">Add Feedback</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-2 block">Type</label>
                <div className="flex gap-2">
                  {(['praise', 'concern', 'suggestion'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFeedbackType(t)}
                      className={cn(
                        'flex-1 h-9 rounded-md border text-xs font-medium capitalize transition-colors',
                        feedbackType === t ? 'bg-neutral-950 text-white border-neutral-950' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-2 block">Message</label>
                <textarea
                  rows={5}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Write your feedback..."
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 resize-none focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-2 block">Visible to</label>
                <div className="flex gap-2">
                  {(['student', 'parent', 'both'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setFeedbackVisibility(v)}
                      className={cn(
                        'flex-1 h-9 rounded-md border text-xs font-medium capitalize transition-colors',
                        feedbackVisibility === v ? 'bg-neutral-950 text-white border-neutral-950' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <button
                disabled={!feedbackText.trim()}
                className="w-full h-10 rounded-md bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
