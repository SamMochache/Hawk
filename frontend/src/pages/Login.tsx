import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Building2 } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  cn } from
'../components/ui';
const ROLES = [
{
  id: 'student',
  label: 'Student',
  icon: GraduationCap
},
{
  id: 'parent',
  label: 'Parent',
  icon: Users
},
{
  id: 'instructor',
  label: 'Instructor',
  icon: BookOpen
},
{
  id: 'admin',
  label: 'Admin',
  icon: Building2
}];

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('student');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (role === 'student' || role === 'parent') {
        navigate(`/${role}`);
      } else {
        // Instructor / A
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('role', role);
        navigate(`/${role}`);
      }
    }, 700);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
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
          duration: 0.4,
          ease: 'easeOut'
        }}
        className="w-full max-w-md">
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 font-semibold text-2xl tracking-tight">
            <div className="w-10 h-10 bg-neutral-950 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-xl font-bold">T</span>
            </div>
            Tinkacode
          </div>
        </div>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to continue. Use any email and password to explore.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selector */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-neutral-100 rounded-lg mb-6">
              {ROLES.map((r) => {
                const active = role === r.id;
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={cn(
                      'flex flex-col items-center gap-1 py-2 rounded-md text-xs font-medium transition-all',
                      active ?
                      'bg-white text-neutral-950 shadow-sm' :
                      'text-neutral-500 hover:text-neutral-900'
                    )}>
                    
                    <Icon size={16} />
                    {r.label}
                  </button>);

              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  defaultValue={`${role}@tinkacode.com`}
                  key={role} />
                
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-xs font-medium text-neutral-500 hover:text-neutral-900">
                    
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  defaultValue="password123" />
                
              </div>
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isLoading}>
                
                {isLoading ?
                'Signing in...' :
                `Sign in as ${ROLES.find((r) => r.id === role)?.label}`}
              </Button>
            </form>

            {(role === 'instructor' || role === 'admin') &&
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
                {ROLES.find((r) => r.id === role)?.label} portal coming in a
                future phase. You'll be redirected to the Student view.
              </p>
            }
          </CardContent>
        </Card>

        <p className="text-center text-sm text-neutral-500 mt-6">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-neutral-900 hover:underline">
            Request access
          </a>
        </p>
      </motion.div>
    </div>);

}