import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar } from
'recharts';
import { motion } from 'framer-motion';
import { Card, CardContent, ProgressBar, Badge, cn } from '../../components/ui';
const TABS = ['Overview', 'Skills', 'Attendance', 'Projects'] as const;
type Tab = (typeof TABS)[number];
const PROGRESS_DATA = [
{
  week: 'W1',
  progress: 12
},
{
  week: 'W2',
  progress: 24
},
{
  week: 'W3',
  progress: 31
},
{
  week: 'W4',
  progress: 42
},
{
  week: 'W5',
  progress: 51
},
{
  week: 'W6',
  progress: 58
},
{
  week: 'W7',
  progress: 68
}];

const TIME_DATA = [
{
  course: 'Python',
  hours: 8.5
},
{
  course: 'Arduino',
  hours: 5.2
},
{
  course: 'AI/ML',
  hours: 3.1
},
{
  course: 'Web',
  hours: 2.4
}];

const SKILLS = [
{
  subject: 'Python',
  A: 78
},
{
  subject: 'Circuits',
  A: 55
},
{
  subject: 'Logic',
  A: 88
},
{
  subject: 'AI/ML',
  A: 42
},
{
  subject: 'Robotics',
  A: 64
}];

const COURSES = [
{
  name: 'Intro to Python',
  category: 'coding',
  progress: 68
},
{
  name: 'Arduino Basics',
  category: 'robotics',
  progress: 35
},
{
  name: 'Machine Learning 101',
  category: 'ai',
  progress: 12
}];

// Generate 84-day attendance heatmap (12 weeks x 7 days)
const ATTENDANCE_DAYS = Array.from(
  {
    length: 84
  },
  (_, i) => {
    const r = Math.random();
    if (i % 7 === 0 || i % 7 === 6) return 0; // weekend
    if (r > 0.85) return 0;
    if (r > 0.75) return 1;
    if (r > 0.5) return 2;
    return 3;
  }
);
export function ChildProgress() {
  const [tab, setTab] = useState<Tab>('Overview');
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Child Progress
        </h1>
        <p className="text-neutral-500 mt-1">Brian Otieno · Grade 8</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <div className="flex gap-1 -mb-px">
          {TABS.map((t) =>
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              tab === t ?
              'border-neutral-950 text-neutral-950' :
              'border-transparent text-neutral-500 hover:text-neutral-900'
            )}>
            
              {t}
            </button>
          )}
        </div>
      </div>

      {tab === 'Overview' &&
      <motion.div
        initial={{
          opacity: 0,
          y: 8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="space-y-6">
        
          {/* Course Progress */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold tracking-tight mb-5">
                Course Progress
              </h3>
              <div className="space-y-4">
                {COURSES.map((c) =>
              <div key={c.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{c.name}</span>
                        <Badge
                      variant={`category-${c.category}` as any}
                      className="capitalize">
                      
                          {c.category}
                        </Badge>
                      </div>
                      <span className="text-sm text-neutral-500 font-medium">
                        {c.progress}%
                      </span>
                    </div>
                    <ProgressBar value={c.progress} />
                  </div>
              )}
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold tracking-tight mb-1">
                  Progress over time
                </h3>
                <p className="text-xs text-neutral-500 mb-5">
                  Cumulative completion %
                </p>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={PROGRESS_DATA}>
                      <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e5e5"
                      vertical={false} />
                    
                      <XAxis
                      dataKey="week"
                      tick={{
                        fill: '#737373',
                        fontSize: 12
                      }}
                      axisLine={{
                        stroke: '#e5e5e5'
                      }}
                      tickLine={false} />
                    
                      <YAxis
                      tick={{
                        fill: '#737373',
                        fontSize: 12
                      }}
                      axisLine={{
                        stroke: '#e5e5e5'
                      }}
                      tickLine={false} />
                    
                      <Tooltip
                      contentStyle={{
                        background: '#0a0a0a',
                        border: 'none',
                        borderRadius: 8,
                        color: 'white',
                        fontSize: 12
                      }}
                      cursor={{
                        stroke: '#a3a3a3',
                        strokeDasharray: '3 3'
                      }} />
                    
                      <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="#0a0a0a"
                      strokeWidth={2}
                      dot={{
                        fill: '#0a0a0a',
                        r: 3
                      }} />
                    
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold tracking-tight mb-1">
                  Time spent
                </h3>
                <p className="text-xs text-neutral-500 mb-5">
                  Hours per course this term
                </p>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={TIME_DATA}>
                      <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e5e5"
                      vertical={false} />
                    
                      <XAxis
                      dataKey="course"
                      tick={{
                        fill: '#737373',
                        fontSize: 12
                      }}
                      axisLine={{
                        stroke: '#e5e5e5'
                      }}
                      tickLine={false} />
                    
                      <YAxis
                      tick={{
                        fill: '#737373',
                        fontSize: 12
                      }}
                      axisLine={{
                        stroke: '#e5e5e5'
                      }}
                      tickLine={false} />
                    
                      <Tooltip
                      contentStyle={{
                        background: '#0a0a0a',
                        border: 'none',
                        borderRadius: 8,
                        color: 'white',
                        fontSize: 12
                      }}
                      cursor={{
                        fill: '#f5f5f5'
                      }} />
                    
                      <Bar
                      dataKey="hours"
                      fill="#0a0a0a"
                      radius={[6, 6, 0, 0]} />
                    
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      }

      {tab === 'Skills' &&
      <motion.div
        initial={{
          opacity: 0,
          y: 8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}>
        
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold tracking-tight mb-5">
                Skill Proficiency
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={SKILLS}>
                      <PolarGrid stroke="#e5e5e5" />
                      <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: '#737373',
                        fontSize: 12
                      }} />
                    
                      <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false} />
                    
                      <Radar
                      dataKey="A"
                      stroke="#0a0a0a"
                      fill="#0a0a0a"
                      fillOpacity={0.1} />
                    
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4 self-center">
                  {SKILLS.map((s) =>
                <div key={s.subject}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{s.subject}</span>
                        <span className="text-neutral-500">{s.A}%</span>
                      </div>
                      <ProgressBar value={s.A} />
                    </div>
                )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      }

      {tab === 'Attendance' &&
      <motion.div
        initial={{
          opacity: 0,
          y: 8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="space-y-6">
        
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
          {
            label: 'Present',
            value: 28,
            tone: 'emerald'
          },
          {
            label: 'Absent',
            value: 3,
            tone: 'red'
          },
          {
            label: 'Late',
            value: 2,
            tone: 'amber'
          },
          {
            label: 'Excused',
            value: 1,
            tone: 'neutral'
          }].
          map((s) =>
          <Card key={s.label}>
                <CardContent className="p-5">
                  <div className="text-2xl font-semibold tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-sm text-neutral-500 mt-1">{s.label}</div>
                </CardContent>
              </Card>
          )}
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    Daily activity
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Last 12 weeks
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  Less
                  {[0, 1, 2, 3].map((l) =>
                <div
                  key={l}
                  className={cn(
                    'w-3 h-3 rounded-sm border border-neutral-200',
                    l === 0 && 'bg-neutral-100',
                    l === 1 && 'bg-neutral-300',
                    l === 2 && 'bg-neutral-600',
                    l === 3 && 'bg-neutral-950'
                  )} />

                )}
                  More
                </div>
              </div>
              <div
              className="grid grid-flow-col gap-1"
              style={{
                gridTemplateRows: 'repeat(7, minmax(0, 1fr))'
              }}>
              
                {ATTENDANCE_DAYS.map((level, i) =>
              <div
                key={i}
                className={cn(
                  'w-3.5 h-3.5 rounded-sm border border-neutral-200/60',
                  level === 0 && 'bg-neutral-100',
                  level === 1 && 'bg-neutral-300',
                  level === 2 && 'bg-neutral-600',
                  level === 3 && 'bg-neutral-950'
                )}
                title={`Day ${i + 1}`} />

              )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      }

      {tab === 'Projects' &&
      <motion.div
        initial={{
          opacity: 0,
          y: 8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
          {
            title: 'LED Traffic Light',
            course: 'robotics',
            score: 92,
            status: 'Graded'
          },
          {
            title: 'Number Guessing Game',
            course: 'coding',
            score: 88,
            status: 'Graded'
          },
          {
            title: 'Pet Classifier',
            course: 'ai',
            score: null,
            status: 'In Review'
          },
          {
            title: 'Calculator App',
            course: 'coding',
            score: 78,
            status: 'Graded'
          },
          {
            title: 'Line-Following Bot',
            course: 'robotics',
            score: null,
            status: 'Submitted'
          },
          {
            title: 'Weather Predictor',
            course: 'ai',
            score: 85,
            status: 'Graded'
          }].
          map((p, i) =>
          <Card
            key={i}
            className="hover:border-neutral-300 transition-colors">
            
                <CardContent className="p-5">
                  <div className="aspect-video rounded-lg bg-neutral-100 mb-4 flex items-center justify-center">
                    <span className="text-neutral-300 text-3xl font-semibold">
                      {p.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                  variant={`category-${p.course}` as any}
                  className="capitalize">
                  
                      {p.course}
                    </Badge>
                    {p.score &&
                <span className="text-sm font-semibold">{p.score}%</span>
                }
                  </div>
                  <h4 className="font-medium text-sm mb-1">{p.title}</h4>
                  <p className="text-xs text-neutral-500">{p.status}</p>
                </CardContent>
              </Card>
          )}
          </div>
        </motion.div>
      }
    </div>);

}