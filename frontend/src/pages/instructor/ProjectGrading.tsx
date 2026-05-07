import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Clock, CheckCircle, Filter, ExternalLink,
  ChevronRight, Sparkles, Save, Send, Star, Code,
  Image as ImageIcon, FileText
} from 'lucide-react';
import { cn } from '../../components/ui';

interface Submission {
  id: string;
  student: string;
  avatar: string;
  projectTitle: string;
  course: string;
  submittedAt: string;
  daysAgo: number;
  status: 'pending' | 'draft' | 'graded';
  demoUrl?: string;
  codeUrl?: string;
  description: string;
  mediaUrls: string[];
  existingScore?: number;
}

const SUBMISSIONS: Submission[] = [
  {
    id: 'sub1', student: 'Liam Njoroge', avatar: 'https://i.pravatar.cc/150?u=liam',
    projectTitle: 'Traffic Light Circuit', course: 'Robotics', submittedAt: '30 Apr', daysAgo: 4,
    status: 'pending', demoUrl: 'https://youtube.com/watch?v=demo', codeUrl: 'https://github.com/liam/traffic-light',
    description: 'Built a traffic light using Arduino Uno, 3 LEDs and a breadboard. Programmed timing sequences with delay() functions.',
    mediaUrls: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400'],
  },
  {
    id: 'sub2', student: 'Sophia Wanjiku', avatar: 'https://i.pravatar.cc/150?u=sophia',
    projectTitle: 'Weather App in Python', course: 'Coding', submittedAt: '2 May', daysAgo: 2,
    status: 'pending', codeUrl: 'https://github.com/sophia/weather-app',
    description: 'Created a CLI weather app using Python and the OpenWeather API. Handles city lookup, temperature conversion and error handling.',
    mediaUrls: ['https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400'],
  },
  {
    id: 'sub3', student: 'David Otieno', avatar: 'https://i.pravatar.cc/150?u=david',
    projectTitle: 'Image Classifier (AI)', course: 'AI', submittedAt: '3 May', daysAgo: 1,
    status: 'draft', existingScore: 72,
    description: 'Trained a CNN model to classify images of cats and dogs using TensorFlow. Achieved 87% accuracy on test set.',
    mediaUrls: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400'],
  },
  {
    id: 'sub4', student: 'Aisha Mwamba', avatar: 'https://i.pravatar.cc/150?u=aisha',
    projectTitle: 'Calculator App', course: 'Coding', submittedAt: '25 Apr', daysAgo: 9,
    status: 'graded', existingScore: 88,
    description: 'Built a functional calculator with HTML, CSS and JavaScript.',
    mediaUrls: [],
  },
];

interface RubricCriteria {
  id: string;
  label: string;
  weight: number;
  score: number;
  maxScore: number;
}

const INITIAL_RUBRIC: RubricCriteria[] = [
  { id: 'r1', label: 'Functionality', weight: 35, score: 0, maxScore: 35 },
  { id: 'r2', label: 'Code Quality / Build Quality', weight: 25, score: 0, maxScore: 25 },
  { id: 'r3', label: 'Creativity & Design', weight: 20, score: 0, maxScore: 20 },
  { id: 'r4', label: 'Documentation & Explanation', weight: 20, score: 0, maxScore: 20 },
];

const AI_SUGGESTIONS = [
  'Consider praising their well-structured loop logic',
  'Note the creative use of error handling — above average for Grade 7',
  'Suggest adding comments to improve code readability',
];

const STATUS_FILTER_OPTIONS = ['All', 'Pending', 'Draft', 'Graded'] as const;
type FilterOption = typeof STATUS_FILTER_OPTIONS[number];

function getScoreGrade(score: number) {
  if (score >= 80) return { grade: 'A', color: 'text-emerald-700 bg-emerald-100' };
  if (score >= 70) return { grade: 'B', color: 'text-blue-700 bg-blue-100' };
  if (score >= 60) return { grade: 'C', color: 'text-amber-700 bg-amber-100' };
  if (score >= 50) return { grade: 'D', color: 'text-orange-700 bg-orange-100' };
  return { grade: 'F', color: 'text-red-700 bg-red-100' };
}

export function ProjectGrading() {
  const [filter, setFilter] = useState<FilterOption>('Pending');
  const [selected, setSelected] = useState<Submission>(SUBMISSIONS[0]);
  const [rubric, setRubric] = useState<RubricCriteria[]>(INITIAL_RUBRIC);
  const [feedback, setFeedback] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [notifyChecked, setNotifyChecked] = useState(true);
  const [savedDraft, setSavedDraft] = useState(false);

  const totalScore = rubric.reduce((sum, r) => sum + r.score, 0);
  const { grade, color: gradeColor } = getScoreGrade(totalScore);

  const filtered = SUBMISSIONS.filter((s) => {
    if (filter === 'All') return true;
    return s.status === filter.toLowerCase();
  });

  const handleRubricChange = (id: string, val: number) => {
    setRubric((prev) => prev.map((r) => r.id === id ? { ...r, score: Math.min(r.maxScore, Math.max(0, val)) } : r));
  };

  const selectSubmission = (sub: Submission) => {
    setSelected(sub);
    setRubric(INITIAL_RUBRIC.map((r) => ({ ...r, score: sub.existingScore ? Math.round((r.weight / 100) * sub.existingScore) : 0 })));
    setFeedback('');
    setSavedDraft(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/instructor" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-950 transition-colors">
          <ArrowLeft size={15} />Back
        </Link>
        <h1 className="text-xl font-semibold text-neutral-950">Project Grading</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[calc(100vh-200px)]">
        {/* Submission Queue */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white flex flex-col">
          <div className="p-4 border-b border-neutral-100">
            <div className="flex gap-1">
              {STATUS_FILTER_OPTIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'flex-1 h-7 rounded-md text-xs font-medium transition-colors',
                    filter === f ? 'bg-neutral-950 text-white' : 'text-neutral-500 hover:bg-neutral-100'
                  )}
                >
                  {f} {f !== 'All' && `(${SUBMISSIONS.filter((s) => s.status === f.toLowerCase()).length})`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
            {filtered.map((sub) => (
              <button
                key={sub.id}
                onClick={() => selectSubmission(sub)}
                className={cn(
                  'w-full p-4 text-left hover:bg-neutral-50 transition-colors',
                  selected.id === sub.id && 'bg-neutral-50 border-l-2 border-l-neutral-950'
                )}
              >
                <div className="flex items-start gap-3">
                  <img src={sub.avatar} alt={sub.student} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <span className="text-sm font-medium text-neutral-900 truncate">{sub.projectTitle}</span>
                      {sub.status === 'graded' && <span className="text-xs font-bold text-emerald-700 shrink-0">{sub.existingScore}%</span>}
                      {sub.status === 'draft' && <span className="text-xs font-medium text-amber-700 shrink-0">Draft</span>}
                    </div>
                    <div className="text-xs text-neutral-500">{sub.student} · {sub.course}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Clock size={10} className={cn(sub.daysAgo >= 3 ? 'text-red-500' : 'text-neutral-400')} />
                      <span className={cn('text-xs', sub.daysAgo >= 3 ? 'text-red-500 font-medium' : 'text-neutral-400')}>
                        {sub.daysAgo}d ago
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className={cn('shrink-0 text-neutral-400 mt-1', selected.id === sub.id && 'text-neutral-950')} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grading Interface */}
        <div className="lg:col-span-3 grid grid-cols-1 gap-4">
          {/* Submission Preview */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-semibold text-neutral-950">{selected.projectTitle}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <img src={selected.avatar} alt={selected.student} className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-sm text-neutral-500">{selected.student} · {selected.course} · {selected.submittedAt}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {selected.codeUrl && (
                  <a href={selected.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                    <Code size={13} />Code
                  </a>
                )}
                {selected.demoUrl && (
                  <a href={selected.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                    <ExternalLink size={13} />Demo
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-neutral-700 mb-4">{selected.description}</p>

            {selected.mediaUrls.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {selected.mediaUrls.map((url, i) => (
                  <img key={i} src={url} alt={`media ${i}`} className="w-28 h-20 object-cover rounded-lg border border-neutral-200" />
                ))}
              </div>
            )}
          </div>

          {/* Rubric + Score */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-950">Rubric Scoring</h3>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-950">{totalScore}<span className="text-sm font-normal text-neutral-400">/100</span></div>
                </div>
                <span className={cn('text-sm font-bold px-2.5 py-1 rounded-md', gradeColor)}>{grade}</span>
              </div>
            </div>

            <div className="space-y-4">
              {rubric.map((r) => (
                <div key={r.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-neutral-700">{r.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">{r.weight}% weight</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={r.maxScore}
                          value={r.score}
                          onChange={(e) => handleRubricChange(r.id, Number(e.target.value))}
                          className="w-14 h-7 rounded border border-neutral-200 text-center text-sm font-semibold focus:outline-none focus:border-neutral-400"
                        />
                        <span className="text-xs text-neutral-400">/{r.maxScore}</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={r.maxScore}
                    value={r.score}
                    onChange={(e) => handleRubricChange(r.id, Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-neutral-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-950 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Feedback + AI */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-950">Feedback</h3>
              <button
                onClick={() => setShowAI(!showAI)}
                className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-violet-50 border border-violet-200 text-xs font-medium text-violet-700 hover:bg-violet-100 transition-colors"
              >
                <Sparkles size={12} />AI Suggestions
              </button>
            </div>

            {showAI && (
              <div className="mb-3 rounded-lg bg-violet-50 border border-violet-200 p-3 space-y-2">
                {AI_SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setFeedback((f) => f + (f ? ' ' : '') + s)}
                    className="flex items-start gap-2 w-full text-left text-xs text-violet-800 hover:text-violet-950 group"
                  >
                    <Star size={11} className="text-violet-400 shrink-0 mt-0.5" />
                    <span>{s} <span className="text-violet-400 group-hover:text-violet-600">(insert)</span></span>
                  </button>
                ))}
              </div>
            )}

            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write detailed feedback for the student..."
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 resize-none focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400"
            />

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyChecked}
                  onChange={(e) => setNotifyChecked(e.target.checked)}
                  className="rounded border-neutral-300"
                />
                Notify student & parent
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSavedDraft(true)}
                  className="flex items-center gap-1.5 h-9 px-4 rounded-md border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Save size={13} />{savedDraft ? 'Saved ✓' : 'Save Draft'}
                </button>
                <button className="flex items-center gap-1.5 h-9 px-4 rounded-md bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800 transition-colors">
                  <Send size={13} />Submit Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
