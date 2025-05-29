
import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = (username: string, password: string) => {
    // Simulação de autenticação
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setCurrentUser(username);
      console.log('Login realizado:', username);
    } else {
      console.log('Credenciais inválidas');
      alert('Credenciais inválidas! Use admin/admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    console.log('Logout realizado');
  };

  return (
    <div className="min-h-screen">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
