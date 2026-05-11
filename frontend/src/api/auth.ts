import client from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'instructor' | 'student' | 'parent';
  };
}

export interface CurrentUserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'instructor' | 'student' | 'parent';
  full_name: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export const authAPI = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await client.post<LoginResponse>('/auth/login/', data);
    return response.data;
  },

  refresh: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await client.post<RefreshTokenResponse>('/auth/refresh/', data);
    return response.data;
  },

  logout: async (data: { refresh: string }): Promise<{ detail: string }> => {
    const response = await client.post<{ detail: string }>('/auth/logout/', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<CurrentUserResponse> => {
    const response = await client.get<CurrentUserResponse>('/users/me/');
    return response.data;
  },
};
