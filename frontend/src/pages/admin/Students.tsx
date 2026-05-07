import React, { useState } from 'react';
import {
  Search, Filter, Plus, Download, Mail, ChevronUp, ChevronDown,
  MoreHorizontal, AlertTriangle, CheckCircle, XCircle, X
} from 'lucide-react';
import { cn } from '../../components/ui';

interface Student {
  id: string;
  name: string;
  avatar: string;
  admissionNo: string;
  grade: string;
  courses: string[];
  progress: number;
  status: 'active' | 'inactive' | 'at-risk';
  joinDate: string;
  parent: string;
}

const STUDENTS: Student[] = [
  { id: 's1', name: 'Amina Hassan', avatar: 'https://i.pravatar.cc/150?u=amina', admissionNo: 'TKC-0142', grade: 'Grade 7', courses: ['Python', 'Robotics'], progress: 42, status: 'at-risk', joinDate: 'Sep 2024', parent: 'Halima Hassan' },
  { id: 's2', name: 'Brian Otieno', avatar: 'https://i.pravatar.cc/150?u=brian', admissionNo: 'TKC-0089', grade: 'Grade 8', courses: ['Robotics', 'AI'], progress: 78, status: 'active', joinDate: 'Jan 2024', parent: 'Grace Otieno' },
  { id: 's3', name: 'Cynthia Waweru', avatar: 'https://i.pravatar.cc/150?u=cynthia', admissionNo: 'TKC-0103', grade: 'Grade 7', courses: ['Python'], progress: 91, status: 'active', joinDate: 'Sep 2024', parent: 'Mary Waweru' },
  { id: 's4', name: 'David Kamau', avatar: 'https://i.pravatar.cc/150?u=david', admissionNo: 'TKC-0156', grade: 'Grade 6', courses: ['Robotics'], progress: 34, status: 'at-risk', joinDate: 'Jan 2025', parent: 'John Kamau' },
  { id: 's5', name: 'Esther Ndung\'u', avatar: 'https://i.pravatar.cc/150?u=esther', admissionNo: 'TKC-0077', grade: 'Grade 8', courses: ['AI', 'Python'], progress: 65, status: 'active', joinDate: 'Jan 2024', parent: 'Peter Ndungu' },
  { id: 's6', name: 'Felix Omondi', avatar: 'https://i.pravatar.cc/150?u=felix', admissionNo: 'TKC-0201', grade: 'Grade 6', courses: ['Robotics'], progress: 55, status: 'active', joinDate: 'Jan 2025', parent: 'Ruth Omondi' },
  { id: 's7', name: 'Grace Muthoni', avatar: 'https://i.pravatar.cc/150?u=grace2', admissionNo: 'TKC-0188', grade: 'Grade 7', courses: ['Python', 'AI'], progress: 28, status: 'at-risk', joinDate: 'Sep 2024', parent: 'James Muthoni' },
  { id: 's8', name: 'Hassan Abdi', avatar: 'https://i.pravatar.cc/150?u=hassan', admissionNo: 'TKC-0112', grade: 'Grade 8', courses: ['AI'], progress: 88, status: 'active', joinDate: 'Sep 2024', parent: 'Abdi Hassan' },
  { id: 's9', name: 'Irene Chebet', avatar: 'https://i.pravatar.cc/150?u=irene', admissionNo: 'TKC-0095', grade: 'Grade 7', courses: ['Robotics', 'Python'], progress: 71, status: 'active', joinDate: 'Jan 2024', parent: 'Chebet Sr.' },
  { id: 's10', name: 'James Kariuki', avatar: 'https://i.pravatar.cc/150?u=james', admissionNo: 'TKC-0167', grade: 'Grade 7', courses: ['Python'], progress: 44, status: 'inactive', joinDate: 'Sep 2024', parent: 'Peter Kariuki' },
];

const STATUS_CONFIG = {
  active: { label: 'Active', color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle },
  inactive: { label: 'Inactive', color: 'text-neutral-600 bg-neutral-100', icon: XCircle },
  'at-risk': { label: 'At Risk', color: 'text-red-700 bg-red-100', icon: AlertTriangle },
};

type SortKey = 'name' | 'grade' | 'progress' | 'status';

export function StudentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const perPage = 8;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setS(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setS('asc'); }
  };
  const [_sortDir, setS] = useState<'asc' | 'desc'>('asc');
  const effectiveSortDir = sortKey ? _sortDir : sortDir;

  const filtered = STUDENTS
    .filter((s) => {
      const q = search.toLowerCase();
      return (
        (s.name.toLowerCase().includes(q) || s.admissionNo.toLowerCase().includes(q)) &&
        (statusFilter === 'all' || s.status === statusFilter) &&
        (gradeFilter === 'all' || s.grade === gradeFilter)
      );
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'grade') cmp = a.grade.localeCompare(b.grade);
      else if (sortKey === 'progress') cmp = a.progress - b.progress;
      else if (sortKey === 'status') cmp = a.status.localeCompare(b.status);
      return effectiveSortDir === 'asc' ? cmp : -cmp;
    });

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };
  const toggleAll = () => {
    setSelected(selected.size === paged.length ? new Set() : new Set(paged.map((s) => s.id)));
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ChevronUp size={12} className="text-neutral-300" />;
    return effectiveSortDir === 'asc' ? <ChevronUp size={12} className="text-neutral-700" /> : <ChevronDown size={12} className="text-neutral-700" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-950">Students</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 h-9 px-4 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
          <Plus size={14} />Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." className="h-9 w-full rounded-md border border-neutral-200 pl-9 pr-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 bg-white">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="at-risk">At Risk</option>
        </select>
        <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 bg-white">
          <option value="all">All Grades</option>
          <option value="Grade 6">Grade 6</option>
          <option value="Grade 7">Grade 7</option>
          <option value="Grade 8">Grade 8</option>
        </select>
        <button className="flex items-center gap-1.5 h-9 px-3 rounded-md border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">
          <Download size={14} />Export CSV
        </button>
      </div>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-neutral-950 text-white text-sm">
          <span className="font-medium">{selected.size} selected</span>
          <div className="flex gap-2 ml-auto">
            <button className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"><Mail size={12} />Message</button>
            <button className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"><Download size={12} />Export</button>
            <button onClick={() => setSelected(new Set())} className="p-1.5 rounded-md hover:bg-white/10 transition-colors"><X size={14} /></button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={selected.size === paged.length && paged.length > 0} onChange={toggleAll} className="rounded border-neutral-300" />
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => toggleSort('name')} className="flex items-center gap-1 text-xs font-semibold text-neutral-600 uppercase tracking-wider hover:text-neutral-950">Name <SortIcon k="name" /></button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => toggleSort('grade')} className="flex items-center gap-1 text-xs font-semibold text-neutral-600 uppercase tracking-wider hover:text-neutral-950">Grade <SortIcon k="grade" /></button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Courses</th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => toggleSort('progress')} className="flex items-center gap-1 text-xs font-semibold text-neutral-600 uppercase tracking-wider hover:text-neutral-950">Progress <SortIcon k="progress" /></button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => toggleSort('status')} className="flex items-center gap-1 text-xs font-semibold text-neutral-600 uppercase tracking-wider hover:text-neutral-950">Status <SortIcon k="status" /></button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Parent</th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {paged.map((s) => {
                const cfg = STATUS_CONFIG[s.status];
                return (
                  <tr key={s.id} className={cn('hover:bg-neutral-50 transition-colors', selected.has(s.id) && 'bg-neutral-50')}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleSelect(s.id)} className="rounded border-neutral-300" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <div>
                          <div className="font-medium text-neutral-900">{s.name}</div>
                          <div className="text-xs text-neutral-400">{s.admissionNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{s.grade}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.courses.map((c) => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div className={cn('h-1.5 rounded-full', s.progress >= 70 ? 'bg-emerald-500' : s.progress >= 50 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${s.progress}%` }} />
                        </div>
                        <span className="text-xs font-medium text-neutral-700">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', cfg.color)}>
                        <cfg.icon size={10} />{cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-500">{s.parent}</td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors">
                        <MoreHorizontal size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs text-neutral-500">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={cn('w-8 h-8 rounded-md text-xs font-medium transition-colors', p === page ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100')}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-neutral-950">Add New Student</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">First Name</label><input className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
                <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Last Name</label><input className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
              </div>
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Grade Level</label>
                <select className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 bg-white">
                  <option>Grade 6</option><option>Grade 7</option><option>Grade 8</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Parent Email</label><input type="email" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
              <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Enroll in Courses</label>
                <div className="flex flex-wrap gap-2">
                  {['Robotics', 'Python Coding', 'AI & ML', 'Web Dev'].map((c) => (
                    <label key={c} className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input type="checkbox" className="rounded border-neutral-300" />{c}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-md border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">Cancel</button>
                <button className="flex-1 h-10 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">Add Student</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
