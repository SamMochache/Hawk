import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Building2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
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
  }
];

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      login(data.user, data.access, data.refresh);
      navigate(`/${data.user.role}`);
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
      // Handle error (show toast, etc.)
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    // Pre-fill demo credentials
    if (newRole === 'student') {
      setEmail('student@tinkacode.com');
      setPassword('password123');
    } else if (newRole === 'parent') {
      setEmail('parent@tinkacode.com');
      setPassword('password123');
    } else if (newRole === 'instructor') {
      setEmail('instructor@tinkacode.com');
      setPassword('password123');
    } else if (newRole === 'admin') {
      setEmail('admin@tinkacode.com');
      setPassword('password123');
    }
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
                    onClick={() => handleRoleChange(r.id)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={loginMutation.isPending}>

                {loginMutation.isPending ?
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