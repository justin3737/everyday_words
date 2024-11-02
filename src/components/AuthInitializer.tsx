import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { setToken } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    
    if (token) {
      setToken(token);
      // 從 URL 中移除 token
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [setToken]);

  return <>{children}</>;
}

export default AuthInitializer; 