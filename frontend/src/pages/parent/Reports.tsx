import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Eye,
  Share2,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight } from
'lucide-react';
import { Card, CardContent, Badge, Button, cn } from '../../components/ui';
const REPORTS = [
{
  id: 1,
  period: 'Apr 1 – Apr 7, 2026',
  type: 'Weekly',
  summary:
  'Brian completed 4 lessons in Python and earned the Code Streak badge. Strong improvement in logical reasoning.',
  skills: 12,
  projects: 1,
  generated: 'Apr 7, 2026'
},
{
  id: 2,
  period: 'Mar 25 – Mar 31, 2026',
  type: 'Weekly',
  summary:
  'Steady progress in Arduino. Brian submitted the LED Traffic Light project and scored 92%.',
  skills: 10,
  projects: 2,
  generated: 'Mar 31, 2026'
},
{
  id: 3,
  period: 'March, 2026',
  type: 'Monthly',
  summary:
  'Comprehensive monthly summary across Python, Arduino, and AI/ML. Above class average in 3 of 4 areas.',
  skills: 38,
  projects: 4,
  generated: 'Apr 1, 2026'
},
{
  id: 4,
  period: 'Mar 18 – Mar 24, 2026',
  type: 'Weekly',
  summary:
  'Brian started the AI/ML 101 course. Slight dip in Arduino practice — consider weekend tinkering.',
  skills: 8,
  projects: 0,
  generated: 'Mar 24, 2026'
}];

const FILTERS = ['All', 'Weekly', 'Monthly', 'Term'] as const;
export function Reports() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [viewing, setViewing] = useState<(typeof REPORTS)[0] | null>(null);
  const filtered = REPORTS.filter((r) => filter === 'All' || r.type === filter);
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
        <p className="text-neutral-500 mt-1">
          Weekly and monthly progress summaries.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-fit">
        {FILTERS.map((f) =>
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={cn(
            'px-4 py-1.5 rounded-md text-sm font-medium transition-all',
            filter === f ?
            'bg-white text-neutral-950 shadow-sm' :
            'text-neutral-500 hover:text-neutral-900'
          )}>
          
            {f}
          </button>
        )}
      </div>

      {/* Report List */}
      {filtered.length === 0 ?
      <Card>
          <CardContent className="p-12 text-center">
            <FileText size={32} className="text-neutral-300 mx-auto mb-3" />
            <h3 className="font-medium">No reports yet</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Reports will appear here once generated.
            </p>
          </CardContent>
        </Card> :

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((report, i) =>
        <motion.div
          key={report.id}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.05
          }}>
          
              <Card className="hover:border-neutral-300 transition-colors h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{report.type}</Badge>
                    <span className="text-xs text-neutral-500">
                      Generated {report.generated}
                    </span>
                  </div>
                  <h3 className="font-semibold tracking-tight">
                    {report.period}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-2 leading-relaxed line-clamp-2 flex-1">
                    {report.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mt-4 pt-4 border-t border-neutral-100">
                    <span>
                      <strong className="text-neutral-900">
                        {report.skills}
                      </strong>{' '}
                      skills
                    </span>
                    <span>
                      <strong className="text-neutral-900">
                        {report.projects}
                      </strong>{' '}
                      projects
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                  size="sm"
                  variant="primary"
                  className="flex-1"
                  onClick={() => setViewing(report)}>
                  
                      <Eye size={14} className="mr-1.5" /> View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download size={14} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
        )}
        </div>
      }

      {/* Viewer Modal */}
      {viewing &&
      <div
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={() => setViewing(null)}>
        
          <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-white rounded-xl border border-neutral-200 shadow-lg max-w-2xl w-full max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}>
          
            <div className="flex items-center justify-between p-5 border-b border-neutral-200">
              <div>
                <Badge variant="outline" className="mb-2">
                  {viewing.type} Report
                </Badge>
                <h3 className="text-lg font-semibold tracking-tight">
                  {viewing.period}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download size={14} className="mr-1.5" /> PDF
                </Button>
                <button
                onClick={() => setViewing(null)}
                className="p-2 hover:bg-neutral-100 rounded-md text-neutral-500"
                aria-label="Close">
                
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-8 space-y-6">
              {/* AI Summary */}
              <div className="p-5 rounded-lg bg-neutral-950 text-white">
                <Badge
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/15 border-0 mb-3">
                
                  <Sparkles size={11} className="mr-1.5" /> AI Summary
                </Badge>
                <p className="text-sm leading-relaxed">{viewing.summary}</p>
              </div>

              {/* Sections */}
              <section>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                  Highlights
                </h4>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex gap-2">
                    <span className="text-neutral-400">·</span>Completed 4
                    Python lessons including Loops & Iteration
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neutral-400">·</span>Submitted LED
                    Traffic Light project — graded 92%
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neutral-400">·</span>Earned Code
                    Streak badge (7-day streak)
                  </li>
                </ul>
              </section>

              <section>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                  Areas to watch
                </h4>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex gap-2">
                    <span className="text-neutral-400">·</span>Missed one
                    Arduino class on Thursday
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neutral-400">·</span>AI/ML practice
                    time below recommended weekly minimum
                  </li>
                </ul>
              </section>

              <section>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                  Suggested next steps
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Encourage 15–20 minutes of Arduino tinkering this weekend.
                  Brian responds well to short, hands-on practice sessions
                  before live classes.
                </p>
              </section>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-neutral-200 bg-neutral-50">
              <button
              className="p-2 text-neutral-500 hover:text-neutral-900 rounded-md"
              aria-label="Previous">
              
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs text-neutral-500">Page 1 of 3</span>
              <button
              className="p-2 text-neutral-500 hover:text-neutral-900 rounded-md"
              aria-label="Next">
              
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      }
    </div>);

}