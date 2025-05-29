
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  user: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="border-b border-neon-blue/30 bg-cyber-gray/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold neon-glow">SYS</span>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-neon-blue">Bem-vindo, {user}</span>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="cyber-button"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
