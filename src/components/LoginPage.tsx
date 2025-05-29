
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-dark"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
      
      <Card className="cyber-card w-full max-w-md mx-4 relative z-10 animate-fade-in">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
            <div className="text-3xl font-bold text-white neon-glow">SYS</div>
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Sistema de Administração
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neon-blue">Usuário</label>
              <Input
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="cyber-input"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neon-blue">Senha</label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full cyber-button text-lg font-semibold py-3"
            >
              <span className="relative z-10">ENTRAR</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
