import React, { useState } from 'react';
import { FileText, Download, Share2, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../../components/ui';

const REPORTS = [
  { id: 'r1', title: 'Weekly Summary — Week 18', type: 'weekly', period: '28 Apr – 4 May 2026', generated: '5 May 2026', students: 312, projects: 14, skills: 8, summary: 'Strong engagement across Robotics classes. Python Grade 7B needs attention.' },
  { id: 'r2', title: 'Monthly Report — April 2026', type: 'monthly', period: 'April 2026', generated: '1 May 2026', students: 298, projects: 47, skills: 12, summary: 'April saw a 6% increase in enrollment. AI course completion rates improved.' },
  { id: 'r3', title: 'Term 1 Report — 2026', type: 'term', period: 'Jan – Mar 2026', generated: '2 Apr 2026', students: 285, projects: 134, skills: 24, summary: 'End-of-term analysis showing overall 72% average completion. 3 at-risk cohorts.' },
  { id: 'r4', title: 'Weekly Summary — Week 17', type: 'weekly', period: '21–27 Apr 2026', generated: '28 Apr 2026', students: 305, projects: 11, skills: 7, summary: 'Attendance dipped slightly. Grade 8 AI class top performer this week.' },
];

const TYPE_STYLES: Record<string, string> = {
  weekly: 'bg-blue-100 text-blue-700',
  monthly: 'bg-violet-100 text-violet-700',
  term: 'bg-amber-100 text-amber-700',
};

export function ReportsPage() {
  const [filter, setFilter] = useState('all');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const filtered = REPORTS.filter((r) => filter === 'all' || r.type === filter);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-950">Reports</h1>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60 transition-colors"
        >
          {generating ? (
            <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating...</>
          ) : (
            <><Sparkles size={14} />Generate Report</>
          )}
        </button>
      </div>

      {generated && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-800">
          <Sparkles size={15} />
          New report generated! "Weekly Summary — Week 19" is ready.
        </div>
      )}

      <div className="flex gap-2">
        {['all', 'weekly', 'monthly', 'term'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn('h-8 px-4 rounded-full text-xs font-medium capitalize transition-colors', filter === f ? 'bg-neutral-950 text-white' : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50')}
          >
            {f === 'all' ? 'All Reports' : f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-neutral-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-neutral-950">{r.title}</h3>
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full capitalize', TYPE_STYLES[r.type])}>{r.type}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
                    <span className="flex items-center gap-1"><Calendar size={11} />{r.period}</span>
                    <span>Generated {r.generated}</span>
                  </div>
                  <p className="text-sm text-neutral-600">{r.summary}</p>
                  <div className="flex gap-4 mt-3 text-xs text-neutral-500">
                    <span><strong className="text-neutral-800">{r.students}</strong> students</span>
                    <span><strong className="text-neutral-800">{r.projects}</strong> projects</span>
                    <span><strong className="text-neutral-800">{r.skills}</strong> skills tracked</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <Share2 size={12} />Share
                </button>
                <button className="flex items-center gap-1.5 h-8 px-3 rounded-md bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800 transition-colors">
                  <Download size={12} />PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
