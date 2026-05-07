import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  FileText,
  Code } from
'lucide-react';
import {
  Card,
  CardContent,
  ProgressBar,
  Badge,
  Button,
  cn } from
'../../components/ui';
const MODULES = [
{
  id: 1,
  title: 'Getting Started with Python',
  progress: 100,
  lessons: [
  {
    id: 101,
    title: 'Introduction to Programming',
    type: 'video',
    duration: '5m',
    status: 'completed'
  },
  {
    id: 102,
    title: 'Setting up your environment',
    type: 'text',
    duration: '10m',
    status: 'completed'
  },
  {
    id: 103,
    title: 'Your first "Hello World"',
    type: 'code',
    duration: '15m',
    status: 'completed'
  }]

},
{
  id: 2,
  title: 'Variables and Data Types',
  progress: 33,
  lessons: [
  {
    id: 201,
    title: 'Understanding Variables',
    type: 'video',
    duration: '8m',
    status: 'completed'
  },
  {
    id: 202,
    title: 'Numbers and Strings',
    type: 'code',
    duration: '20m',
    status: 'in-progress'
  },
  {
    id: 203,
    title: 'Booleans and Logic',
    type: 'video',
    duration: '12m',
    status: 'locked'
  }]

},
{
  id: 3,
  title: 'Control Flow',
  progress: 0,
  locked: true,
  lessons: [
  {
    id: 301,
    title: 'If/Else Statements',
    type: 'video',
    duration: '15m',
    status: 'locked'
  },
  {
    id: 302,
    title: 'For Loops',
    type: 'code',
    duration: '25m',
    status: 'locked'
  }]

}];

export function CourseDetail() {
  const { id } = useParams();
  const [expandedModule, setExpandedModule] = useState<number | null>(2);
  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle size={16} />;
      case 'text':
        return <FileText size={16} />;
      case 'code':
        return <Code size={16} />;
      default:
        return <PlayCircle size={16} />;
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={18} className="text-neutral-900" />;
      case 'in-progress':
        return (
          <Circle size={18} className="text-neutral-900 fill-neutral-900/20" />);

      case 'locked':
        return <Lock size={16} className="text-neutral-400" />;
      default:
        return <Circle size={18} className="text-neutral-300" />;
    }
  };
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link
        to="/student"
        className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-950 mb-6 transition-colors">
        
        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Course Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="aspect-video bg-neutral-100 rounded-xl border border-neutral-200 flex items-center justify-center overflow-hidden">
            <Code size={48} className="text-neutral-300" />
          </div>

          <div>
            <Badge variant="category-coding" className="mb-3">
              Coding
            </Badge>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Intro to Python
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Learn the fundamentals of Python programming. Perfect for absolute
              beginners looking to build a strong foundation in coding.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="text-neutral-500">65%</span>
              </div>
              <ProgressBar value={65} />
            </div>

            <Link to="/student/lesson/202" className="block">
              <Button className="w-full">Continue Learning</Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Modules */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight mb-4">
            Course Content
          </h2>

          {MODULES.map((mod) =>
          <Card
            key={mod.id}
            className={cn(
              'overflow-hidden transition-colors',
              mod.locked ? 'bg-neutral-50/50' : 'bg-white'
            )}>
            
              <button
              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-950"
              onClick={() =>
              !mod.locked &&
              setExpandedModule(expandedModule === mod.id ? null : mod.id)
              }
              disabled={mod.locked}>
              
                <div>
                  <h3
                  className={cn(
                    'font-medium',
                    mod.locked && 'text-neutral-500'
                  )}>
                  
                    {mod.id}. {mod.title}
                  </h3>
                  {!mod.locked &&
                <div className="flex items-center gap-2 mt-1.5">
                      <div className="w-24">
                        <ProgressBar value={mod.progress} className="h-1.5" />
                      </div>
                      <span className="text-xs text-neutral-500 font-medium">
                        {mod.progress}%
                      </span>
                    </div>
                }
                </div>
                {mod.locked ?
              <Lock size={18} className="text-neutral-400" /> :

              <span className="text-sm text-neutral-500 font-medium">
                    {mod.lessons.length} lessons
                  </span>
              }
              </button>

              {expandedModule === mod.id && !mod.locked &&
            <div className="border-t border-neutral-100 bg-neutral-50/30">
                  {mod.lessons.map((lesson, idx) =>
              <div
                key={lesson.id}
                className={cn(
                  'flex items-center justify-between px-6 py-3 border-b border-neutral-100 last:border-0',
                  lesson.status === 'locked' ?
                  'opacity-60' :
                  'hover:bg-neutral-50 cursor-pointer'
                )}>
                
                      <div className="flex items-center gap-3">
                        {getStatusIcon(lesson.status)}
                        <div className="flex flex-col">
                          <span
                      className={cn(
                        'text-sm font-medium',
                        lesson.status === 'locked' ?
                        'text-neutral-500' :
                        'text-neutral-900'
                      )}>
                      
                            {idx + 1}. {lesson.title}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5">
                            {getIcon(lesson.type)}
                            <span className="capitalize">{lesson.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-neutral-500 font-medium">
                        <Clock size={14} className="mr-1" />
                        {lesson.duration}
                      </div>
                    </div>
              )}
                </div>
            }
            </Card>
          )}
        </div>
      </div>
    </div>);

}