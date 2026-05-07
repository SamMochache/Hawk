import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Award } from 'lucide-react';
import { Card, CardContent, Badge, cn } from '../../components/ui';
const LEADERBOARD_DATA = [
{
  rank: 1,
  name: 'Sarah Jenkins',
  points: 3450,
  streak: 12,
  badges: 8,
  isCurrentUser: false
},
{
  rank: 2,
  name: 'David Chen',
  points: 3200,
  streak: 8,
  badges: 6,
  isCurrentUser: false
},
{
  rank: 3,
  name: 'Amina Yusuf',
  points: 2950,
  streak: 5,
  badges: 5,
  isCurrentUser: false
},
{
  rank: 4,
  name: 'Brian M.',
  points: 2800,
  streak: 4,
  badges: 4,
  isCurrentUser: true
},
{
  rank: 5,
  name: 'James Wilson',
  points: 2650,
  streak: 2,
  badges: 3,
  isCurrentUser: false
},
{
  rank: 6,
  name: 'Emma Thompson',
  points: 2400,
  streak: 1,
  badges: 3,
  isCurrentUser: false
}];

export function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Leaderboard</h1>
        <p className="text-neutral-500 mt-1">
          Compete with your classmates and earn rewards.
        </p>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 h-64 mt-12 mb-16">
        {/* 2nd Place */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2
          }}
          className="flex flex-col items-center">
          
          <div className="w-12 h-12 rounded-full bg-neutral-200 border-2 border-white shadow-sm mb-3 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=david" alt="David" />
          </div>
          <div className="w-24 h-32 bg-neutral-100 rounded-t-lg border border-neutral-200 border-b-0 flex flex-col items-center justify-start pt-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-200/50 to-transparent" />
            <span className="text-2xl font-bold text-neutral-400 relative z-10">
              2
            </span>
            <span className="text-xs font-medium text-neutral-500 mt-1 relative z-10">
              3.2k pts
            </span>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.1
          }}
          className="flex flex-col items-center">
          
          <Trophy className="text-amber-500 mb-2" size={24} />
          <div className="w-16 h-16 rounded-full bg-neutral-200 border-2 border-white shadow-md mb-3 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" />
          </div>
          <div className="w-28 h-40 bg-neutral-950 rounded-t-lg border border-neutral-900 border-b-0 flex flex-col items-center justify-start pt-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
            <span className="text-3xl font-bold text-white relative z-10">
              1
            </span>
            <span className="text-xs font-medium text-neutral-400 mt-1 relative z-10">
              3.4k pts
            </span>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.3
          }}
          className="flex flex-col items-center">
          
          <div className="w-12 h-12 rounded-full bg-neutral-200 border-2 border-white shadow-sm mb-3 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=amina" alt="Amina" />
          </div>
          <div className="w-24 h-24 bg-neutral-50 rounded-t-lg border border-neutral-200 border-b-0 flex flex-col items-center justify-start pt-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-200/30 to-transparent" />
            <span className="text-2xl font-bold text-neutral-400 relative z-10">
              3
            </span>
            <span className="text-xs font-medium text-neutral-500 mt-1 relative z-10">
              2.9k pts
            </span>
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-500 uppercase bg-neutral-50/50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium text-right">Points</th>
                <th className="px-6 py-4 font-medium text-right">Streak</th>
                <th className="px-6 py-4 font-medium text-right">Badges</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD_DATA.map((row) =>
              <tr
                key={row.rank}
                className={cn(
                  'border-b border-neutral-100 last:border-0 transition-colors',
                  row.isCurrentUser ?
                  'bg-neutral-50' :
                  'hover:bg-neutral-50/50'
                )}>
                
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    #{row.rank}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                        <img
                        src={`https://i.pravatar.cc/150?u=${row.name.toLowerCase()}`}
                        alt={row.name} />
                      
                      </div>
                      <span
                      className={cn(
                        'font-medium',
                        row.isCurrentUser && 'text-neutral-950'
                      )}>
                      
                        {row.name} {row.isCurrentUser && '(You)'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-neutral-900">
                    {row.points.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-neutral-600">
                      <Flame
                      size={14}
                      className={
                      row.streak > 3 ?
                      'text-orange-500' :
                      'text-neutral-400'
                      } />
                    
                      {row.streak}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-neutral-600">
                      <Award size={14} className="text-neutral-400" />
                      {row.badges}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>);

}