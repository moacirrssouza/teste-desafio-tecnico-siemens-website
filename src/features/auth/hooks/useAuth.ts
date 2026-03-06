import { useCallback, useMemo } from 'react';

export function useAuth() {
  const token = useMemo(() => localStorage.getItem('authToken'), []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('authToken', newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }, []);

  return {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };
}
