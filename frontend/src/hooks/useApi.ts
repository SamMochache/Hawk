import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { useAuth } from './useAuth';

export const useApi = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const handleError = (error: any) => {
    if (error.response?.status === 401) {
      logout();
    }
    throw error;
  };

  const get = (url: string, config?: any) => {
    return client.get(url, config);
  };

  const post = (url: string, data?: any, config?: any) => {
    return client.post(url, data, config);
  };

  const put = (url: string, data?: any, config?: any) => {
    return client.put(url, data, config);
  };

  const patch = (url: string, data?: any, config?: any) => {
    return client.patch(url, data, config);
  };

  const delete_ = (url: string, config?: any) => {
    return client.delete(url, config);
  };

  const useQueryWrapper = (key: string[], fn: () => Promise<any>, options?: any) => {
    return useQuery({
      queryKey: key,
      queryFn: fn,
      ...options,
    });
  };

  const useMutationWrapper = (fn: (data: any) => Promise<any>, options?: any) => {
    return useMutation({
      mutationFn: fn,
      onError: handleError,
      ...options,
    });
  };

  return {
    get,
    post,
    put,
    patch,
    delete: delete_,
    useQuery: useQueryWrapper,
    useMutation: useMutationWrapper,
    queryClient,
  };
};