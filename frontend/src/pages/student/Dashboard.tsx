import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Play,
  Clock,
  Flame,
  Award,
  ChevronRight,
  Code,
  Cpu,
  Bot } from
'lucide-react';
import {
  Card,
  CardContent,
  ProgressRing,
  Badge,
  Button } from
'../../components/ui';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar } from
'recharts';
import { useCourses } from '../../hooks/useCourses';
import { useEnrollments } from '../../hooks/useEnrollments';
import { useAuth } from '../../hooks/useAuth';

const CATEGORY_ICONS = {
  coding: Code,
  robotics: Cpu,
  ai: Bot,
};

const SKILLS_DATA = [
{
  subject: 'Python',
  A: 85,
  fullMark: 100
},
{
  subject: 'Circuits',
  A: 60,
  fullMark: 100
},
{
  subject: 'Logic',
  A: 90,
  fullMark: 100
},
{
  subject: 'AI/ML',
  A: 45,
  fullMark: 100
},
{
  subject: 'Robotics',
  A: 70,
  fullMark: 100
}];

export function Dashboard() {
  const { user } = useAuth();
  const { data: courses = [], isLoading: coursesLoading } = useCourses();
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useEnrollments();

  // Combine courses with enrollment progress
  const enrolledCourses = courses
    .map(course => {
      const enrollment = enrollments.find(e => e.course === course.id && e.student === user?.id);
      const Icon = CATEGORY_ICONS[course.category as keyof typeof CATEGORY_ICONS] || Code;
      return {
        ...course,
        progress: enrollment?.progress || 0,
        icon: Icon,
        color: `category-${course.category}`,
        nextLesson: 'Continue Learning', // This would come from lessons API
        timeLeft: '45m', // This would be calculated
      };
    })
    .filter(course => enrollments.some(e => e.course === course.id && e.student === user?.id));

  if (coursesLoading || enrollmentsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Good morning, {user?.first_name || 'Student'}.
          </h1>
          <p className="text-neutral-500 mt-1">
            You're on a 4-day streak. Keep it up!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Card className="px-4 py-2 flex items-center gap-2 rounded-full border-neutral-200">
            <Flame className="text-orange-500" size={18} />
            <span className="font-semibold text-sm">4 Days</span>
          </Card>
          <Card className="px-4 py-2 flex items-center gap-2 rounded-full border-neutral-200">
            <Award className="text-neutral-900" size={18} />
            <span className="font-semibold text-sm">1,250 pts</span>
          </Card>
        </div>
      </div>

      {/* Continue Learning */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Continue Learning
          </h2>
          <Link
            to="/student/courses"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-950 flex items-center gap-1 transition-colors">
            
            View all <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map((course, i) =>
          <motion.div
            key={course.id}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.1
            }}>
            
              <Link to={`/student/courses/${course.id}`}>
                <Card className="group hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
                        <course.icon size={20} />
                      </div>
                      <Badge
                      variant={course.color as any}
                      className="capitalize">
                      
                        {course.category}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-1 group-hover:text-neutral-700 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-6 flex-1">
                      Next: {course.nextLesson}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                      <div className="flex items-center gap-3">
                        <ProgressRing
                        value={course.progress}
                        size={36}
                        strokeWidth={3} />
                      
                        <span className="text-sm font-medium">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-neutral-500 font-medium">
                        <Clock size={14} className="mr-1" />
                        {course.timeLeft}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skills Radar */}
        <section className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold tracking-tight mb-6">
                Skill Proficiency
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    data={SKILLS_DATA}>
                    
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
                      name="Skills"
                      dataKey="A"
                      stroke="#171717"
                      fill="#171717"
                      fillOpacity={0.1} />
                    
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Class */}
        <section>
          <Card className="h-full bg-neutral-950 text-white border-neutral-900">
            <CardContent className="p-6 flex flex-col h-full">
              <Badge
                variant="secondary"
                className="w-fit mb-6 bg-white/10 text-white hover:bg-white/20">
                
                Live Class
              </Badge>
              <h3 className="text-xl font-semibold mb-2">
                Advanced Robotics Lab
              </h3>
              <p className="text-neutral-400 text-sm mb-6">
                Instructor: Sarah Jenkins
              </p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-sm border-b border-white/10 pb-4">
                  <span className="text-neutral-400">Starts in</span>
                  <span className="font-mono font-medium">00:45:00</span>
                </div>
                <Button className="w-full bg-white text-neutral-950 hover:bg-neutral-200">
                  <Play size={16} className="mr-2" /> Join Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>);

}