import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Mail, Phone, X, Star, BookOpen, Users } from 'lucide-react';
import { cn } from '../../components/ui';

const INSTRUCTORS = [
  { id: 'i1', name: 'Ms. Achieng', avatar: 'https://i.pravatar.cc/150?u=achieng', email: 'achieng@tinkacode.com', phone: '+254 701 234 567', specialization: ['Python', 'AI'], classes: 4, students: 94, rating: 4.8, status: 'active', joinDate: 'Jan 2024' },
  { id: 'i2', name: 'Mr. Korir', avatar: 'https://i.pravatar.cc/150?u=korir', email: 'korir@tinkacode.com', phone: '+254 722 345 678', specialization: ['Robotics', 'Arduino'], classes: 3, students: 72, rating: 4.6, status: 'active', joinDate: 'Sep 2024' },
  { id: 'i3', name: 'Ms. Njeri', avatar: 'https://i.pravatar.cc/150?u=njeri', email: 'njeri@tinkacode.com', phone: '+254 733 456 789', specialization: ['Web Dev', 'Python'], classes: 2, students: 46, rating: 4.9, status: 'active', joinDate: 'Jan 2025' },
  { id: 'i4', name: 'Mr. Owino', avatar: 'https://i.pravatar.cc/150?u=owino', email: 'owino@tinkacode.com', phone: '+254 744 567 890', specialization: ['AI', 'Data Science'], classes: 1, students: 20, rating: 4.3, status: 'inactive', joinDate: 'Sep 2023' },
];

const SPEC_COLORS: Record<string, string> = {
  Python: 'bg-emerald-100 text-emerald-700',
  AI: 'bg-violet-100 text-violet-700',
  Robotics: 'bg-orange-100 text-orange-700',
  Arduino: 'bg-orange-100 text-orange-700',
  'Web Dev': 'bg-blue-100 text-blue-700',
  'Data Science': 'bg-pink-100 text-pink-700',
};

export function InstructorsPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = INSTRUCTORS.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.specialization.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-950">Instructors</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 h-9 px-4 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
          <Plus size={14} />Add Instructor
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search instructors..." className="h-9 w-full rounded-md border border-neutral-200 pl-9 pr-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((inst) => (
          <div key={inst.id} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={inst.avatar} alt={inst.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-neutral-950">{inst.name}</div>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Star size={11} fill="currentColor" />
                    <span className="font-medium text-neutral-700">{inst.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', inst.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-600')}>
                  {inst.status}
                </span>
                <button className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {inst.specialization.map((s) => (
                <span key={s} className={cn('text-xs font-medium px-2 py-0.5 rounded-full', SPEC_COLORS[s] || 'bg-neutral-100 text-neutral-700')}>{s}</span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-neutral-50 p-2.5 flex items-center gap-2">
                <BookOpen size={13} className="text-neutral-400" />
                <div>
                  <div className="text-xs font-semibold text-neutral-900">{inst.classes}</div>
                  <div className="text-[10px] text-neutral-400">Classes</div>
                </div>
              </div>
              <div className="rounded-lg bg-neutral-50 p-2.5 flex items-center gap-2">
                <Users size={13} className="text-neutral-400" />
                <div>
                  <div className="text-xs font-semibold text-neutral-900">{inst.students}</div>
                  <div className="text-[10px] text-neutral-400">Students</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-500">
              <a href={`mailto:${inst.email}`} className="flex items-center gap-2 hover:text-neutral-800 transition-colors">
                <Mail size={12} />{inst.email}
              </a>
              <div className="flex items-center gap-2">
                <Phone size={12} />{inst.phone}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-neutral-950">Add Instructor</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">First Name</label><input className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400" /></div>
                <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Last Name</label><input className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400" /></div>
              </div>
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Email</label><input type="email" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400" /></div>
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Robotics', 'AI', 'Web Dev', 'Arduino'].map((s) => (
                    <label key={s} className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input type="checkbox" className="rounded border-neutral-300" />{s}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-md border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">Cancel</button>
                <button className="flex-1 h-10 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">Add Instructor</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
