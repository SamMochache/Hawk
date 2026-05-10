import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  BookOpen,
  Home,
  Trophy,
  FolderOpen,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  TrendingUp,
  FileText,
  Users,
  Settings,
  DollarSign,
  UserCheck } from
'lucide-react';
import { cn } from './ui';
const NAV_CONFIG: Record<
  string,
  {
    label: string;
    icon: any;
    path: string;
  }[]> =
{
  student: [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/student'
  },
  {
    label: 'My Courses',
    icon: BookOpen,
    path: '/student/courses'
  },
  {
    label: 'Projects',
    icon: FolderOpen,
    path: '/student/projects'
  },
  {
    label: 'Leaderboard',
    icon: Trophy,
    path: '/student/leaderboard'
  }],

  parent: [
  {
    label: 'Overview',
    icon: Home,
    path: '/parent'
  },
  {
    label: 'Progress',
    icon: TrendingUp,
    path: '/parent/progress'
  },
  {
    label: 'Reports',
    icon: FileText,
    path: '/parent/reports'
  },
  {
    label: 'Notifications',
    icon: Bell,
    path: '/parent/notifications'
  }],

  instructor: [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/instructor'
  },
  {
    label: 'Classes',
    icon: BookOpen,
    path: '/instructor/classes'
  },
  {
    label: 'Grading',
    icon: FileText,
    path: '/instructor/grading'
  },
  {
    label: 'Analytics',
    icon: TrendingUp,
    path: '/instructor/analytics'
  }],

  admin: [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/admin'
  },
  {
    label: 'Students',
    icon: Users,
    path: '/admin/students'
  },
  {
    label: 'Instructors',
    icon: UserCheck,
    path: '/admin/instructors'
  },
  {
    label: 'Classes',
    icon: BookOpen,
    path: '/admin/classes'
  },
  {
    label: 'Reports',
    icon: FileText,
    path: '/admin/reports'
  },
  {
    label: 'Billing',
    icon: DollarSign,
    path: '/admin/billing'
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/admin/settings'
  }]

};
const USER_PROFILES: Record<
  string,
  {
    name: string;
    role: string;
    avatar: string;
    subtitle: string;
  }> =
{
  student: {
    name: 'Brian Otieno',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=brian',
    subtitle: 'Grade 8 · Explorer'
  },
  parent: {
    name: 'Grace Otieno',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?u=grace',
    subtitle: 'Parent Account'
  },
  instructor: {
    name: 'Dr. Sarah Johnson',
    role: 'instructor',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    subtitle: 'Lead Instructor'
  },
  admin: {
    name: 'Michael Chen',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    subtitle: 'System Administrator'
  }
};
export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const role = location.pathname.split('/')[1] || 'student';
  const navItems = NAV_CONFIG[role] || NAV_CONFIG.student;
  const profile = USER_PROFILES[role] || USER_PROFILES.student;
  const rootPath = `/${role}`;
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <div className="w-6 h-6 bg-neutral-950 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          Tinkacode
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-neutral-600">
          
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
        
        <div className="p-6 hidden md:flex items-center gap-2 font-semibold text-xl tracking-tight">
          <div className="w-8 h-8 bg-neutral-950 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          Tinkacode
        </div>

        <div className="flex-1 px-4 py-6 md:py-2 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 px-2 capitalize">
            {role}
          </div>
          {navItems.map((item) => {
            const isActive =
            location.pathname === item.path ||
            item.path !== rootPath &&
            location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive ?
                  'bg-neutral-100 text-neutral-950' :
                  'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                )}>
                
                <item.icon
                  size={18}
                  className={isActive ? 'text-neutral-950' : 'text-neutral-400'} />
                
                {item.label}
              </Link>);

          })}
        </div>

        <div className="p-4 border-t border-neutral-200 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full bg-neutral-200 overflow-hidden shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover" />
              
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-neutral-950 truncate">
                {profile.name}
              </span>
              <span className="text-xs text-neutral-500 truncate">
                {profile.subtitle}
              </span>
            </div>
          </div>
          <Link
            to="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950 transition-colors">
            
            <LogOut size={18} className="text-neutral-400" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen &&
      <div
        className="fixed inset-0 bg-neutral-950/20 z-20 md:hidden backdrop-blur-sm"
        onClick={() => setIsMobileMenuOpen(false)} />

      }

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 bg-white/50 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder={
                role === 'parent' ?
                'Search reports, activity...' :
                'Search courses...'
                }
                className="h-9 w-full rounded-md border border-neutral-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all" />
              
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-neutral-500 hover:text-neutral-950 transition-colors rounded-full hover:bg-neutral-100">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neutral-950 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-neutral-200 border border-neutral-300 overflow-hidden">
              <img
                src={profile.avatar}
                alt="User avatar"
                className="w-full h-full object-cover" />
              
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>);

}