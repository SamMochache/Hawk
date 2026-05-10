import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  instructor: number;
  instructor_name: string;
  category: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await client.get<Course[]>(API_ENDPOINTS.COURSES.LIST);
      return response.data;
    },
  });
};

export const useCourse = (id: number) => {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: async () => {
      const response = await client.get<Course>(API_ENDPOINTS.COURSES.DETAIL(id));
      return response.data;
    },
    enabled: !!id,
  });
};