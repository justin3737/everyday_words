import React from 'react';
import { getApiBaseUrl } from '../../api/utils';
import './LoginButton.css';

const LoginButton: React.FC = () => {
  const handleLogin = (): void => {
    const URL = `${getApiBaseUrl()}/auth/google`;
    window.location.assign(URL);
  };

  return (
    <button 
      className="google-login-button"
      onClick={handleLogin}
    >
      <img 
        src="/google-logo.svg"
        alt="Google logo" 
        className="google-icon"
      />
      <span>使用 Google 登入</span>
    </button>
  );
};

export default LoginButton; 