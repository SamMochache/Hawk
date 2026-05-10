import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export interface Enrollment {
  id: number;
  student: number;
  student_email: string;
  course: number;
  course_title: string;
  enrolled_at: string;
  active: boolean;
  progress: number;
  completed: boolean;
}

export const useEnrollments = () => {
  return useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await client.get<Enrollment[]>(API_ENDPOINTS.ENROLLMENTS.LIST);
      return response.data;
    },
  });
};