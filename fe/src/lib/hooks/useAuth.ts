import { useState, useEffect, useCallback } from 'react';
import { authApi } from '@/lib/api/pocketbase';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const isAuth = authApi.isAuthenticated();
      setIsAuthenticated(isAuth);
      setUser(isAuth ? authApi.getCurrentUser() : null);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authApi.login(email, password);
      setIsAuthenticated(true);
      setUser(authApi.getCurrentUser());
      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Failed to login' 
      };
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (email: string, password: string, passwordConfirm: string, name: string) => {
    setIsLoading(true);
    try {
      await authApi.register(email, password, passwordConfirm, name);
      // Auto login after registration
      await authApi.login(email, password);
      setIsAuthenticated(true);
      setUser(authApi.getCurrentUser());
      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Failed to register' 
      };
    } finally {
      setIsLoading(false);
    }
  }, [router, login]);

  const logout = useCallback(() => {
    authApi.logout();
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  }, [router]);

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout
  };
}
