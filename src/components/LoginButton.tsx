import React from 'react';
import { getApiBaseUrl } from '../api/utils';

const LoginButton: React.FC = () => {
  const handleLogin = (): void => {
    window.location.href = `${getApiBaseUrl()}/api/auth/google`;
  };

  return (
    <button onClick={handleLogin}>
      使用 Google 登入
    </button>
  );
};

export default LoginButton; 