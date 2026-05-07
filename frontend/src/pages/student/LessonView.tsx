import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Pause,
  Maximize,
  Settings,
  CheckCircle2,
  ChevronRight,
  ChevronLeft } from
'lucide-react';
import { Button, ProgressBar, cn } from '../../components/ui';
export function LessonView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  return (
    <div className="fixed inset-0 bg-neutral-950 text-neutral-50 flex flex-col z-50">
      {/* Topbar */}
      <header className="h-14 border-b border-neutral-800 flex items-center justify-between px-4 shrink-0 bg-neutral-950">
        <div className="flex items-center gap-4">
          <Link
            to="/student/courses/1"
            className="text-neutral-400 hover:text-white transition-colors">
            
            <ArrowLeft size={20} />
          </Link>
          <div className="h-4 w-px bg-neutral-800" />
          <h1 className="text-sm font-medium">2. Numbers and Strings</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-neutral-400">
            <span>Course Progress</span>
            <div className="w-24">
              <ProgressBar
                value={65}
                className="bg-neutral-800 [&>div]:bg-white" />
              
            </div>
            <span>65%</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Video Player Mock */}
        <div className="flex-1 bg-black relative flex flex-col justify-center items-center group">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}>
              
              {isPlaying ?
              <Pause size={32} className="text-white" /> :

              <Play size={32} className="text-white ml-2" />
              }
            </div>
          </div>

          {/* Custom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs font-mono text-neutral-300">03:24</span>
              <div className="flex-1 h-1 bg-neutral-800 rounded-full cursor-pointer relative">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-white rounded-full"
                  style={{
                    width: `${progress}%`
                  }} />
                
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"
                  style={{
                    left: `calc(${progress}% - 6px)`
                  }} />
                
              </div>
              <span className="text-xs font-mono text-neutral-300">10:00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-neutral-300">
                  
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-white hover:text-neutral-300">
                  <Settings size={20} />
                </button>
                <button className="text-white hover:text-neutral-300">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Instructions */}
        <div className="w-full md:w-80 lg:w-96 bg-neutral-900 border-l border-neutral-800 flex flex-col shrink-0">
          <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Lesson Notes
            </h2>
            <div className="prose prose-invert prose-sm max-w-none text-neutral-300">
              <p>
                In Python, numbers and strings are two of the most basic data
                types you'll work with.
              </p>
              <h3 className="text-white mt-6 mb-2 font-medium">
                Integers vs Floats
              </h3>
              <p>
                An integer is a whole number, while a float has a decimal point.
              </p>
              <pre className="bg-neutral-950 p-3 rounded-md border border-neutral-800 mt-2 text-xs font-mono text-neutral-300">
                <code>
                  <span className="text-neutral-500"># Integer</span>
                  <br />
                  age = 25
                  <br />
                  <br />
                  <span className="text-neutral-500"># Float</span>
                  <br />
                  price = 19.99
                </code>
              </pre>
            </div>
          </div>

          <div className="p-4 border-t border-neutral-800 bg-neutral-900">
            <Button className="w-full bg-white text-neutral-950 hover:bg-neutral-200">
              <CheckCircle2 size={18} className="mr-2" /> Mark Complete
            </Button>
            <div className="flex items-center justify-between mt-4">
              <button className="text-xs font-medium text-neutral-400 hover:text-white flex items-center">
                <ChevronLeft size={14} className="mr-1" /> Previous
              </button>
              <button className="text-xs font-medium text-neutral-400 hover:text-white flex items-center">
                Next <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}