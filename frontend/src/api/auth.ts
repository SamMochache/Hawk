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
  login: (data: LoginRequest) =>
    client.post<LoginResponse>('/auth/login/', data),

  refresh: (data: RefreshTokenRequest) =>
    client.post<RefreshTokenResponse>('/auth/refresh/', data),

  logout: (data: { refresh: string }) =>
    client.post<{ detail: string }>('/auth/logout/', data),

  getCurrentUser: () =>
    client.get<CurrentUserResponse>('/users/me/'),
};
