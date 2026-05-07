import React, { useState } from 'react';
import { Plus, X, Clock, Users, BookOpen, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../components/ui';

const CLASSES = [
  { id: 'cl1', name: 'Robotics Basics', course: 'Robotics', instructor: 'Mr. Korir', grade: 'Grade 6A', schedule: 'Mon, Wed 08:00–09:30', students: 24, maxStudents: 30, status: 'active', color: 'border-l-orange-500', dot: 'bg-orange-500' },
  { id: 'cl2', name: 'Python Fundamentals', course: 'Coding', instructor: 'Ms. Achieng', grade: 'Grade 7B', schedule: 'Tue, Thu 10:00–11:30', students: 28, maxStudents: 30, status: 'active', color: 'border-l-emerald-500', dot: 'bg-emerald-500' },
  { id: 'cl3', name: 'AI & Machine Learning', course: 'AI', instructor: 'Ms. Achieng', grade: 'Grade 8', schedule: 'Mon, Wed 13:00–14:30', students: 20, maxStudents: 25, status: 'active', color: 'border-l-violet-500', dot: 'bg-violet-500' },
  { id: 'cl4', name: 'Arduino Projects', course: 'Robotics', instructor: 'Mr. Korir', grade: 'Grade 6B', schedule: 'Tue, Thu 15:00–16:30', students: 22, maxStudents: 30, status: 'active', color: 'border-l-blue-500', dot: 'bg-blue-500' },
  { id: 'cl5', name: 'Web Development', course: 'Coding', instructor: 'Ms. Njeri', grade: 'Grade 7A', schedule: 'Fri 09:00–11:00', students: 18, maxStudents: 25, status: 'upcoming', color: 'border-l-pink-500', dot: 'bg-pink-500' },
  { id: 'cl6', name: 'Data Science Intro', course: 'AI', instructor: 'Mr. Owino', grade: 'Grade 8', schedule: 'Fri 13:00–15:00', students: 12, maxStudents: 20, status: 'inactive', color: 'border-l-neutral-400', dot: 'bg-neutral-400' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const CALENDAR_ENTRIES = [
  { day: 'Mon', hour: '08:00', name: 'Robotics Basics', color: 'bg-orange-100 border-orange-300 text-orange-800', span: 2 },
  { day: 'Tue', hour: '10:00', name: 'Python Fundamentals', color: 'bg-emerald-100 border-emerald-300 text-emerald-800', span: 2 },
  { day: 'Mon', hour: '13:00', name: 'AI & ML', color: 'bg-violet-100 border-violet-300 text-violet-800', span: 2 },
  { day: 'Tue', hour: '15:00', name: 'Arduino Projects', color: 'bg-blue-100 border-blue-300 text-blue-800', span: 2 },
  { day: 'Wed', hour: '08:00', name: 'Robotics Basics', color: 'bg-orange-100 border-orange-300 text-orange-800', span: 2 },
  { day: 'Thu', hour: '10:00', name: 'Python Fundamentals', color: 'bg-emerald-100 border-emerald-300 text-emerald-800', span: 2 },
  { day: 'Wed', hour: '13:00', name: 'AI & ML', color: 'bg-violet-100 border-violet-300 text-violet-800', span: 2 },
  { day: 'Thu', hour: '15:00', name: 'Arduino Projects', color: 'bg-blue-100 border-blue-300 text-blue-800', span: 2 },
  { day: 'Fri', hour: '09:00', name: 'Web Development', color: 'bg-pink-100 border-pink-300 text-pink-800', span: 2 },
  { day: 'Fri', hour: '13:00', name: 'Data Science', color: 'bg-neutral-100 border-neutral-300 text-neutral-700', span: 2 },
];

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  upcoming: 'bg-blue-100 text-blue-700',
  inactive: 'bg-neutral-100 text-neutral-600',
};

export function ClassesPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showModal, setShowModal] = useState(false);

  const getEntry = (day: string, hour: string) =>
    CALENDAR_ENTRIES.find((e) => e.day === day && e.hour === hour);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-950">Classes</h1>
        <div className="flex gap-2">
          <div className="flex rounded-md border border-neutral-200 overflow-hidden bg-white">
            <button onClick={() => setView('list')} className={cn('h-9 px-3 text-sm font-medium transition-colors', view === 'list' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-50')}>List</button>
            <button onClick={() => setView('calendar')} className={cn('h-9 px-3 text-sm font-medium transition-colors', view === 'calendar' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-50')}>Calendar</button>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 h-9 px-4 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
            <Plus size={14} />New Class
          </button>
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {['Class', 'Course', 'Instructor', 'Schedule', 'Students', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {CLASSES.map((cls) => (
                <tr key={cls.id} className={cn('hover:bg-neutral-50 transition-colors border-l-4', cls.color)}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-neutral-900">{cls.name}</div>
                    <div className="text-xs text-neutral-400">{cls.grade}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{cls.course}</td>
                  <td className="px-4 py-3 text-neutral-600">{cls.instructor}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <Clock size={12} className="text-neutral-400" />{cls.schedule}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-700 font-medium">{cls.students}</span>
                      <span className="text-neutral-400">/ {cls.maxStudents}</span>
                      <div className="w-16 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-1.5 rounded-full bg-neutral-400" style={{ width: `${(cls.students / cls.maxStudents) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full capitalize', STATUS_STYLES[cls.status])}>{cls.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="h-7 px-2.5 rounded-md border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors"><ChevronLeft size={16} /></button>
              <span className="text-sm font-semibold text-neutral-950">Week of 4–8 May 2026</span>
              <button className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors"><ChevronRight size={16} /></button>
            </div>
            <button className="h-7 px-3 rounded-md border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">Today</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="w-16 px-3 py-2.5 text-left text-neutral-400 font-normal">Time</th>
                  {DAYS.map((d) => (
                    <th key={d} className="px-2 py-2.5 text-center font-semibold text-neutral-700 min-w-[130px]">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map((hour) => (
                  <tr key={hour} className="border-b border-neutral-50">
                    <td className="px-3 py-2 text-neutral-400 text-[10px] align-top">{hour}</td>
                    {DAYS.map((day) => {
                      const entry = getEntry(day, hour);
                      return (
                        <td key={day} className="px-1 py-1 align-top">
                          {entry && (
                            <div className={cn('rounded-md border px-2 py-1.5 text-[11px] font-medium leading-tight cursor-pointer hover:brightness-95 transition-all', entry.color)}>
                              {entry.name}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-neutral-950">Create New Class</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Class Name</label><input className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" placeholder="e.g. Python Fundamentals" /></div>
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Course</label>
                <select className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 bg-white">
                  <option>Robotics</option><option>Python Coding</option><option>AI & ML</option><option>Web Development</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Instructor</label>
                <select className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 bg-white">
                  <option>Ms. Achieng (2 classes)</option><option>Mr. Korir (2 classes)</option><option>Ms. Njeri (1 class)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Grade</label>
                  <select className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 bg-white">
                    <option>Grade 6A</option><option>Grade 6B</option><option>Grade 7A</option><option>Grade 7B</option><option>Grade 8</option>
                  </select>
                </div>
                <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Max Students</label><input type="number" defaultValue={25} className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
              </div>
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Schedule</label><input className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" placeholder="e.g. Mon, Wed 10:00–11:30" /></div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-md border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">Cancel</button>
                <button className="flex-1 h-10 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">Create Class</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
