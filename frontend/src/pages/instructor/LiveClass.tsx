import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Radio, Users, Clock, Grid3x3, List,
  AlertTriangle, CheckCircle, Minus, Send, ChevronRight,
  ChevronLeft, RefreshCw, XCircle, MessageSquare, Flag
} from 'lucide-react';
import { cn } from '../../components/ui';

type StudentStatus = 'active' | 'idle' | 'stuck' | 'completed';

interface LiveStudent {
  id: string;
  name: string;
  avatar: string;
  status: StudentStatus;
  currentLesson: string;
  progress: number;
  timeSpent: number; // minutes
  alert?: string;
  attended: boolean;
}

const INITIAL_STUDENTS: LiveStudent[] = [
  { id: 's1', name: 'Amina Hassan', avatar: 'https://i.pravatar.cc/150?u=amina', status: 'stuck', currentLesson: 'Lesson 4: For Loops', progress: 42, timeSpent: 47, alert: 'Stuck for 45 min', attended: true },
  { id: 's2', name: 'Brian Otieno', avatar: 'https://i.pravatar.cc/150?u=brian', status: 'active', currentLesson: 'Lesson 5: Functions', progress: 68, timeSpent: 52, attended: true },
  { id: 's3', name: 'Cynthia Waweru', avatar: 'https://i.pravatar.cc/150?u=cynthia', status: 'completed', currentLesson: 'Lesson 6: Classes', progress: 85, timeSpent: 55, attended: true },
  { id: 's4', name: 'David Kamau', avatar: 'https://i.pravatar.cc/150?u=david', status: 'idle', currentLesson: 'Lesson 4: For Loops', progress: 40, timeSpent: 12, alert: 'Idle for 10 min', attended: true },
  { id: 's5', name: 'Esther Ndung\'u', avatar: 'https://i.pravatar.cc/150?u=esther', status: 'active', currentLesson: 'Lesson 5: Functions', progress: 62, timeSpent: 50, attended: true },
  { id: 's6', name: 'Felix Omondi', avatar: 'https://i.pravatar.cc/150?u=felix', status: 'active', currentLesson: 'Lesson 5: Functions', progress: 59, timeSpent: 48, attended: true },
  { id: 's7', name: 'Grace Muthoni', avatar: 'https://i.pravatar.cc/150?u=grace2', status: 'stuck', currentLesson: 'Lesson 3: Conditionals', progress: 31, timeSpent: 55, alert: 'Needs help', attended: true },
  { id: 's8', name: 'Hassan Abdi', avatar: 'https://i.pravatar.cc/150?u=hassan', status: 'active', currentLesson: 'Lesson 6: Classes', progress: 88, timeSpent: 54, attended: true },
  { id: 's9', name: 'Irene Chebet', avatar: 'https://i.pravatar.cc/150?u=irene', status: 'active', currentLesson: 'Lesson 5: Functions', progress: 70, timeSpent: 49, attended: true },
  { id: 's10', name: 'James Kariuki', avatar: 'https://i.pravatar.cc/150?u=james', status: 'idle', currentLesson: 'Lesson 4: For Loops', progress: 44, timeSpent: 8, alert: 'Low engagement', attended: true },
  { id: 's11', name: 'Kevin Mwangi', avatar: 'https://i.pravatar.cc/150?u=kevin', status: 'active', currentLesson: 'Lesson 5: Functions', progress: 65, timeSpent: 50, attended: true },
  { id: 's12', name: 'Lilian Simiyu', avatar: 'https://i.pravatar.cc/150?u=lilian', status: 'completed', currentLesson: 'Lesson 7: File I/O', progress: 95, timeSpent: 56, attended: false },
];

const ALERTS = [
  { id: 1, type: 'stuck', student: 'Amina Hassan', msg: 'Stuck on Lesson 4 for 45+ min', time: '2 min ago' },
  { id: 2, type: 'idle', student: 'James Kariuki', msg: 'Idle for 10 minutes', time: '5 min ago' },
  { id: 3, type: 'success', student: 'Cynthia Waweru', msg: 'Completed Module 1!', time: '8 min ago' },
  { id: 4, type: 'stuck', student: 'Grace Muthoni', msg: 'Needs help on Lesson 3', time: '12 min ago' },
];

const STATUS_CONFIG: Record<StudentStatus, { label: string; color: string; dot: string }> = {
  active: { label: 'Active', color: 'text-emerald-700 bg-emerald-100', dot: 'bg-emerald-500' },
  idle: { label: 'Idle', color: 'text-amber-700 bg-amber-100', dot: 'bg-amber-500' },
  stuck: { label: 'Stuck', color: 'text-red-700 bg-red-100', dot: 'bg-red-500' },
  completed: { label: 'Done', color: 'text-blue-700 bg-blue-100', dot: 'bg-blue-500' },
};

const LESSONS = ['Lesson 1: Intro', 'Lesson 2: Variables', 'Lesson 3: Conditionals', 'Lesson 4: For Loops', 'Lesson 5: Functions', 'Lesson 6: Classes', 'Lesson 7: File I/O'];

export function LiveClassMonitor() {
  const { classId } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [elapsed, setElapsed] = useState(52 * 60 + 14); // 52:14 mock
  const [currentLesson, setCurrentLesson] = useState(4);
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    Object.fromEntries(INITIAL_STUDENTS.map((s) => [s.id, s.attended]))
  );
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<LiveStudent | null>(null);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const activeCount = INITIAL_STUDENTS.filter((s) => s.status === 'active').length;
  const alertCount = INITIAL_STUDENTS.filter((s) => s.alert).length;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Top Bar */}
      <header className="h-14 border-b border-white/10 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/instructor" className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} />Back
          </Link>
          <div className="w-px h-4 bg-white/20" />
          <span className="text-sm font-medium">Python Fundamentals — Grade 7B</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />LIVE
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Clock size={14} />
            <span className="font-mono">{fmt(elapsed)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Users size={14} />
            <span>{activeCount}/{INITIAL_STUDENTS.length} active</span>
          </div>
          {alertCount > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-amber-400">
              <AlertTriangle size={14} />
              <span>{alertCount} alerts</span>
            </div>
          )}
          <button className="h-8 px-4 rounded-md bg-red-600 hover:bg-red-700 text-sm font-medium transition-colors">
            End Class
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Main Panel */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Subbar */}
          <div className="h-11 border-b border-white/10 px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50">Current Lesson:</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentLesson((l) => Math.max(0, l - 1))} className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                  <ChevronLeft size={14} />
                </button>
                <span className="text-xs font-medium text-white bg-white/10 px-3 py-1 rounded-md">
                  {LESSONS[currentLesson]}
                </span>
                <button onClick={() => setCurrentLesson((l) => Math.min(LESSONS.length - 1, l + 1))} className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={cn('p-1.5 rounded transition-colors', viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white')}
              >
                <Grid3x3 size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn('p-1.5 rounded transition-colors', viewMode === 'list' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white')}
              >
                <List size={15} />
              </button>
              <button className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white ml-2 transition-colors">
                <RefreshCw size={12} />Auto-refresh 5s
              </button>
            </div>
          </div>

          {/* Student Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
                {INITIAL_STUDENTS.map((s) => {
                  const cfg = STATUS_CONFIG[s.status];
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStudent(s)}
                      className={cn(
                        'rounded-xl border p-3 text-left hover:border-white/30 transition-all group',
                        s.alert ? 'border-red-500/40 bg-red-500/5' : 'border-white/10 bg-white/5'
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="relative">
                          <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                          <span className={cn('absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-neutral-950', cfg.dot)} />
                        </div>
                        {s.alert && <AlertTriangle size={12} className="text-amber-400 shrink-0" />}
                      </div>
                      <div className="text-xs font-medium text-white truncate">{s.name.split(' ')[0]}</div>
                      <div className="text-[10px] text-white/40 truncate mb-2">{s.currentLesson.split(':')[0]}</div>
                      <div className="w-full bg-white/10 rounded-full h-1">
                        <div
                          className={cn('h-1 rounded-full', s.status === 'stuck' ? 'bg-red-500' : s.status === 'completed' ? 'bg-blue-400' : 'bg-emerald-400')}
                          style={{ width: `${s.progress}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-white/40 mt-1">{s.progress}%</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-white/50">Student</th>
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-white/50">Status</th>
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-white/50">Current Lesson</th>
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-white/50">Progress</th>
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-white/50">Time</th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {INITIAL_STUDENTS.map((s) => {
                      const cfg = STATUS_CONFIG[s.status];
                      return (
                        <tr key={s.id} className={cn('hover:bg-white/5 transition-colors', s.alert && 'bg-red-500/5')}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="relative shrink-0">
                                <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full object-cover" />
                                <span className={cn('absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-neutral-950', cfg.dot)} />
                              </div>
                              <span className="text-sm text-white font-medium">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', cfg.color)}>{cfg.label}</span>
                          </td>
                          <td className="px-4 py-3 text-xs text-white/60">{s.currentLesson}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-white/10 rounded-full h-1.5">
                                <div className="h-1.5 rounded-full bg-emerald-400" style={{ width: `${s.progress}%` }} />
                              </div>
                              <span className="text-xs text-white/60">{s.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-white/60">{s.timeSpent}m</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 justify-end">
                              {s.alert && (
                                <button className="p-1.5 rounded hover:bg-white/10 text-amber-400 transition-colors">
                                  <MessageSquare size={13} />
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedStudent(s)}
                                className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                              >
                                <ChevronRight size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 border-l border-white/10 flex flex-col shrink-0">
          {/* Alerts */}
          <div className="border-b border-white/10">
            <div className="p-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Live Alerts</span>
              <span className="text-xs text-white/30">{ALERTS.length}</span>
            </div>
            <div className="space-y-2 px-4 pb-4 max-h-56 overflow-y-auto">
              {ALERTS.map((a) => (
                <div
                  key={a.id}
                  className={cn(
                    'rounded-lg p-3 text-xs',
                    a.type === 'stuck' ? 'bg-red-500/10 border border-red-500/20' :
                    a.type === 'idle' ? 'bg-amber-500/10 border border-amber-500/20' :
                    'bg-emerald-500/10 border border-emerald-500/20'
                  )}
                >
                  <div className="font-medium text-white mb-0.5">{a.student}</div>
                  <div className="text-white/60">{a.msg}</div>
                  <div className="text-white/30 mt-1">{a.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance */}
          <div className="border-b border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Attendance</span>
              <span className="text-xs text-white/40">{Object.values(attendance).filter(Boolean).length}/{INITIAL_STUDENTS.length}</span>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {INITIAL_STUDENTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setAttendance((a) => ({ ...a, [s.id]: !a[s.id] }))}
                  className="w-full flex items-center gap-2 text-left hover:bg-white/5 rounded-md px-1.5 py-1 transition-colors"
                >
                  <div className={cn(
                    'w-4 h-4 rounded shrink-0 border flex items-center justify-center',
                    attendance[s.id] ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                  )}>
                    {attendance[s.id] && <CheckCircle size={10} className="text-white" />}
                  </div>
                  <span className="text-xs text-white/70 truncate">{s.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setAttendanceSubmitted(true)}
              className={cn(
                'w-full mt-3 h-8 rounded-md text-xs font-medium transition-colors',
                attendanceSubmitted
                  ? 'bg-emerald-600/20 text-emerald-400 cursor-default'
                  : 'bg-white text-neutral-950 hover:bg-white/90'
              )}
            >
              {attendanceSubmitted ? '✓ Submitted' : 'Submit Attendance'}
            </button>
          </div>

          {/* Broadcast */}
          <div className="p-4 flex-1">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider block mb-3">Broadcast Message</span>
            <textarea
              rows={3}
              placeholder="Send a message to all students..."
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-white/30 resize-none focus:outline-none focus:border-white/30"
            />
            <button className="mt-2 w-full h-8 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-colors">
              <Send size={12} />Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Student Detail Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setSelectedStudent(null)} />
          <div className="w-80 bg-neutral-900 border-l border-white/10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold">Student Detail</span>
              <button onClick={() => setSelectedStudent(null)} className="p-1.5 rounded hover:bg-white/10 text-white/60">
                <XCircle size={16} />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-white">{selectedStudent.name}</div>
                <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', STATUS_CONFIG[selectedStudent.status].color)}>
                  {STATUS_CONFIG[selectedStudent.status].label}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-white/40 mb-1">Current Lesson</div>
                <div className="text-sm text-white">{selectedStudent.currentLesson}</div>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-1">Progress</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${selectedStudent.progress}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-white">{selectedStudent.progress}%</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-1">Time Spent</div>
                <div className="text-sm text-white">{selectedStudent.timeSpent} minutes</div>
              </div>
              {selectedStudent.alert && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-red-400 mb-1">
                    <AlertTriangle size={12} />Alert
                  </div>
                  <div className="text-xs text-white/70">{selectedStudent.alert}</div>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 h-9 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-colors">
                  <MessageSquare size={13} />Message
                </button>
                <button className="flex-1 h-9 rounded-md bg-red-500/20 hover:bg-red-500/30 text-xs font-medium text-red-400 flex items-center justify-center gap-1.5 transition-colors">
                  <Flag size={13} />Flag
                </button>
              </div>
              <Link
                to={`/instructor/students/${selectedStudent.id}`}
                className="w-full h-9 rounded-md border border-white/10 hover:bg-white/10 text-xs font-medium text-white/70 flex items-center justify-center gap-1.5 transition-colors"
              >
                View Full Profile <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
