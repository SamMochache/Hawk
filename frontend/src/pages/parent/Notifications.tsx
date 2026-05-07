import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Award,
  FileText,
  Calendar,
  MessageCircle,
  Settings } from
'lucide-react';
import { Card, CardContent, Button, Badge, cn } from '../../components/ui';
const NOTIFICATIONS = [
{
  id: 1,
  type: 'achievement',
  icon: Award,
  title: 'Brian earned a new badge',
  body: 'Code Streak — 7 consecutive days of practice.',
  time: '2 hours ago',
  unread: true
},
{
  id: 2,
  type: 'warning',
  icon: AlertCircle,
  title: 'Missed class',
  body: 'Brian missed Arduino Basics on Thursday at 4:00 PM.',
  time: 'Yesterday',
  unread: true
},
{
  id: 3,
  type: 'report',
  icon: FileText,
  title: 'Weekly report available',
  body: 'Your weekly progress summary for Mar 28 – Apr 4 is ready.',
  time: '2 days ago',
  unread: false
},
{
  id: 4,
  type: 'success',
  icon: CheckCircle2,
  title: 'Project graded',
  body: 'LED Traffic Light scored 92% with feedback from Sarah Jenkins.',
  time: '3 days ago',
  unread: false
},
{
  id: 5,
  type: 'event',
  icon: Calendar,
  title: 'Parent–Teacher Meeting',
  body: 'Scheduled for Apr 12 at 3:00 PM.',
  time: '4 days ago',
  unread: false
},
{
  id: 6,
  type: 'message',
  icon: MessageCircle,
  title: 'Message from Sarah Jenkins',
  body: 'Great progress this week — Brian is showing real curiosity.',
  time: '5 days ago',
  unread: false
}];

const FILTERS = ['All', 'Unread', 'Achievements', 'Reports', 'Alerts'] as const;
export function Notifications() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [items, setItems] = useState(NOTIFICATIONS);
  const filtered = items.filter((n) => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return n.unread;
    if (filter === 'Achievements')
    return n.type === 'achievement' || n.type === 'success';
    if (filter === 'Reports') return n.type === 'report';
    if (filter === 'Alerts') return n.type === 'warning';
    return true;
  });
  const markAllRead = () =>
  setItems((prev) =>
  prev.map((n) => ({
    ...n,
    unread: false
  }))
  );
  const markRead = (id: number) =>
  setItems((prev) =>
  prev.map((n) =>
  n.id === id ?
  {
    ...n,
    unread: false
  } :
  n
  )
  );
  const unreadCount = items.filter((n) => n.unread).length;
  return (
    <div className="space-y-8 pb-8 max-w-3xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
            Notifications
            {unreadCount > 0 &&
            <Badge variant="default" className="bg-neutral-950">
                {unreadCount}
              </Badge>
            }
          </h1>
          <p className="text-neutral-500 mt-1">
            Stay updated on your child's learning journey.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllRead}
          disabled={unreadCount === 0}>
          
          Mark all read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-fit overflow-x-auto">
        {FILTERS.map((f) =>
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={cn(
            'px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap',
            filter === f ?
            'bg-white text-neutral-950 shadow-sm' :
            'text-neutral-500 hover:text-neutral-900'
          )}>
          
            {f}
          </button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ?
      <Card>
          <CardContent className="p-12 text-center">
            <Bell size={32} className="text-neutral-300 mx-auto mb-3" />
            <h3 className="font-medium">You're all caught up</h3>
            <p className="text-sm text-neutral-500 mt-1">
              No notifications match this filter.
            </p>
          </CardContent>
        </Card> :

      <Card>
          <div className="divide-y divide-neutral-100">
            {filtered.map((n, i) =>
          <motion.button
            key={n.id}
            initial={{
              opacity: 0,
              y: 4
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.03
            }}
            onClick={() => markRead(n.id)}
            className={cn(
              'w-full text-left flex items-start gap-4 p-5 transition-colors hover:bg-neutral-50',
              n.unread && 'bg-neutral-50/40'
            )}>
            
                <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0 border',
                n.type === 'warning' &&
                'bg-white border-amber-200 text-amber-700',
                (n.type === 'achievement' || n.type === 'success') &&
                'bg-neutral-950 border-neutral-950 text-white',
                n.type === 'report' &&
                'bg-white border-neutral-200 text-neutral-700',
                n.type === 'event' &&
                'bg-white border-neutral-200 text-neutral-700',
                n.type === 'message' &&
                'bg-white border-neutral-200 text-neutral-700'
              )}>
              
                  <n.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm text-neutral-950">
                      {n.title}
                    </h4>
                    {n.unread &&
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0" />
                }
                  </div>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                    {n.body}
                  </p>
                  <span className="text-xs text-neutral-500 mt-2 inline-block">
                    {n.time}
                  </span>
                </div>
              </motion.button>
          )}
          </div>
        </Card>
      }

      {/* Preferences */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <Settings size={18} className="text-neutral-700" />
            <h3 className="font-semibold tracking-tight">
              Notification preferences
            </h3>
          </div>
          <div className="space-y-4">
            {[
            {
              label: 'Weekly reports',
              desc: 'AI summaries delivered every Sunday',
              enabled: true
            },
            {
              label: 'Missed classes',
              desc: 'Get notified when your child misses a session',
              enabled: true
            },
            {
              label: 'Achievements & badges',
              desc: 'Celebrate milestones in real-time',
              enabled: true
            },
            {
              label: 'Project grades',
              desc: 'When instructors finish grading',
              enabled: true
            },
            {
              label: 'Marketing & updates',
              desc: 'Product news and tips',
              enabled: false
            }].
            map((pref) =>
            <Toggle key={pref.label} {...pref} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>);

}
function Toggle({
  label,
  desc,
  enabled: init




}: {label: string;desc: string;enabled: boolean;}) {
  const [on, setOn] = useState(init);
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{desc}</div>
      </div>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={cn(
          'relative w-10 h-6 rounded-full transition-colors shrink-0 ml-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
          on ? 'bg-neutral-950' : 'bg-neutral-200'
        )}>
        
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform',
            on && 'translate-x-4'
          )} />
        
      </button>
    </div>);

}