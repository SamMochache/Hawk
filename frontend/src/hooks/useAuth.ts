import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setTokens,
    setUser,
    setLoading,
  } = useAuthStore();

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setTokens,
    setUser,
    setLoading,
  };
};