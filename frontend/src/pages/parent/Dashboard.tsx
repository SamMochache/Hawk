import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  CalendarCheck,
  FolderOpen,
  Award,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ThumbsUp,
  ThumbsDown } from
'lucide-react';
import { Card, CardContent, Badge, Button, cn } from '../../components/ui';
const CHILDREN = [
{
  id: 1,
  name: 'Brian Otieno',
  grade: 'Grade 8',
  avatar: 'https://i.pravatar.cc/150?u=brian'
},
{
  id: 2,
  name: 'Amani Otieno',
  grade: 'Grade 5',
  avatar: 'https://i.pravatar.cc/150?u=amani'
}];

const ACTIVITY = [
{
  type: 'success',
  text: 'Completed lesson: Loops & Iteration',
  time: '2 hours ago',
  icon: CheckCircle2
},
{
  type: 'achievement',
  text: 'Earned badge: Code Streak (7 days)',
  time: 'Yesterday',
  icon: Award
},
{
  type: 'project',
  text: 'Submitted project: LED Traffic Light',
  time: '2 days ago',
  icon: FolderOpen
},
{
  type: 'success',
  text: 'Completed lesson: Variables in Python',
  time: '3 days ago',
  icon: CheckCircle2
},
{
  type: 'warning',
  text: 'Missed class: Arduino Basics',
  time: '4 days ago',
  icon: AlertCircle
}];

const ALERTS = [
{
  tone: 'warning',
  text: 'Brian missed Arduino class on Thursday.',
  cta: 'View attendance'
},
{
  tone: 'success',
  text: 'Brian earned 3 new badges this week.',
  cta: 'See achievements'
}];

export function ParentDashboard() {
  const [child, setChild] = useState(CHILDREN[0]);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Family Overview
          </h1>
          <p className="text-neutral-500 mt-1">
            Stay close to your child's learning journey.
          </p>
        </div>

        {/* Child Selector */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
            
            <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
              <img
                src={child.avatar}
                alt={child.name}
                className="w-full h-full object-cover" />
              
            </div>
            <div className="text-left">
              <div className="text-sm font-medium leading-tight">
                {child.name}
              </div>
              <div className="text-xs text-neutral-500 leading-tight">
                {child.grade}
              </div>
            </div>
            <ChevronDown size={16} className="text-neutral-400" />
          </button>
          {open &&
          <div className="absolute right-0 mt-2 w-64 rounded-lg border border-neutral-200 bg-white shadow-md z-10 p-1">
              {CHILDREN.map((c) =>
            <button
              key={c.id}
              onClick={() => {
                setChild(c);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                child.id === c.id ?
                'bg-neutral-100' :
                'hover:bg-neutral-50'
              )}>
              
                  <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                    <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-full h-full object-cover" />
                
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-neutral-500">{c.grade}</div>
                  </div>
                </button>
            )}
            </div>
          }
        </div>
      </div>

      {/* AI Weekly Summary */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4
        }}>
        
        <Card className="bg-neutral-950 text-white border-neutral-900 overflow-hidden relative">
          {/* Subtle accent grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
          
          <CardContent className="p-8 relative">
            <div className="flex items-center justify-between mb-5">
              <Badge
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/15 border-0">
                
                <Sparkles size={12} className="mr-1.5" />
                AI Weekly Summary
              </Badge>
              <span className="text-xs text-neutral-400 font-medium">
                Mar 28 – Apr 4
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight max-w-3xl">
              This week,{' '}
              <span className="text-white font-semibold">
                {child.name.split(' ')[0]}
              </span>{' '}
              made strong progress in{' '}
              <span className="text-white font-semibold">Intro to Python</span>,
              completing 4 lessons and earning the{' '}
              <span className="text-white font-semibold">Code Streak</span>{' '}
              badge. Logical reasoning improved noticeably this week, though
              Arduino practice slipped after a missed class on Thursday.
            </h2>

            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                💡 Suggestion
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed">
                Encourage 15 minutes of Arduino tinkering this weekend to
                maintain momentum before next class.
              </p>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
              <span className="text-xs text-neutral-400">
                Was this summary helpful?
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFeedback('up')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    feedback === 'up' ?
                    'bg-white/15 text-white' :
                    'text-neutral-400 hover:text-white hover:bg-white/5'
                  )}
                  aria-label="Helpful">
                  
                  <ThumbsUp size={14} />
                </button>
                <button
                  onClick={() => setFeedback('down')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    feedback === 'down' ?
                    'bg-white/15 text-white' :
                    'text-neutral-400 hover:text-white hover:bg-white/5'
                  )}
                  aria-label="Not helpful">
                  
                  <ThumbsDown size={14} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
        {
          label: 'Overall Progress',
          value: '68%',
          delta: '+5%',
          icon: TrendingUp,
          positive: true
        },
        {
          label: 'Attendance',
          value: '12/14',
          delta: '86%',
          icon: CalendarCheck,
          positive: true
        },
        {
          label: 'Projects',
          value: '7',
          delta: '2 graded',
          icon: FolderOpen,
          positive: null
        },
        {
          label: 'Points',
          value: '2,800',
          delta: '+340 this week',
          icon: Award,
          positive: true
        }].
        map((stat, i) =>
        <motion.div
          key={stat.label}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.05 * i
          }}>
          
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <stat.icon size={16} className="text-neutral-700" />
                  </div>
                </div>
                <div className="text-2xl font-semibold tracking-tight">
                  {stat.value}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-neutral-500">{stat.label}</span>
                  <span
                  className={cn(
                    'text-xs font-medium',
                    stat.positive === true ?
                    'text-emerald-700' :
                    'text-neutral-500'
                  )}>
                  
                    {stat.delta}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </section>

      {/* Two-column lower */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold tracking-tight">
                Recent Activity
              </h3>
              <Link
                to="/parent/progress"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-950 inline-flex items-center gap-1 transition-colors">
                
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="relative space-y-5">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-neutral-200" />
              {ACTIVITY.map((item, i) =>
              <div key={i} className="relative flex items-start gap-4">
                  <div
                  className={cn(
                    'relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border',
                    item.type === 'success' &&
                    'bg-white border-neutral-200 text-neutral-700',
                    item.type === 'warning' &&
                    'bg-white border-amber-200 text-amber-700',
                    item.type === 'achievement' &&
                    'bg-neutral-950 border-neutral-950 text-white',
                    item.type === 'project' &&
                    'bg-white border-neutral-200 text-neutral-700'
                  )}>
                  
                    <item.icon size={14} />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="text-sm text-neutral-900">{item.text}</div>
                    <div className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
                      <Clock size={11} />
                      {item.time}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Alerts + Upcoming */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold tracking-tight mb-4">
                Alerts
              </h3>
              <div className="space-y-3">
                {ALERTS.map((alert, i) =>
                <div
                  key={i}
                  className={cn(
                    'p-3 rounded-lg border text-sm',
                    alert.tone === 'warning' &&
                    'bg-amber-50 border-amber-200 text-amber-900',
                    alert.tone === 'success' &&
                    'bg-emerald-50 border-emerald-200 text-emerald-900'
                  )}>
                  
                    <div className="font-medium leading-snug">{alert.text}</div>
                    <button className="text-xs font-medium mt-1.5 underline-offset-2 hover:underline opacity-80">
                      {alert.cta} →
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold tracking-tight mb-4">
                Upcoming
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-neutral-500 font-medium mb-1">
                    Tomorrow · 4:00 PM
                  </div>
                  <div className="text-sm font-medium">
                    Arduino Basics — Live Class
                  </div>
                </div>
                <div className="border-t border-neutral-100 pt-4">
                  <div className="text-xs text-neutral-500 font-medium mb-1">
                    Apr 12
                  </div>
                  <div className="text-sm font-medium">
                    Parent–Teacher Meeting
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}