
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  username: string;
  role: string;
  permissions: string[];
}

const UsersSubTab: React.FC = () => {
  const [users] = useState<User[]>([
    { id: 1, username: 'admin', role: 'Administrator', permissions: ['data', 'admin', 'logs'] },
    { id: 2, username: 'operator', role: 'Operator', permissions: ['data', 'logs'] },
  ]);
  
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });
  const { toast } = useToast();

  const handleCreateUser = () => {
    if (!newUser.username || !newUser.password || !newUser.role) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    console.log('Criando usuário:', newUser);
    toast({
      title: "Sucesso",
      description: "Usuário criado com sucesso",
    });
    setNewUser({ username: '', password: '', role: '' });
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-neon-purple neon-glow">Gerenciar Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              placeholder="Nome de usuário"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="cyber-input"
            />
            <Input
              type="password"
              placeholder="Senha"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="cyber-input"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Cargo"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="cyber-input flex-1"
              />
              <Button onClick={handleCreateUser} className="cyber-button">
                Criar
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-neon-blue/30">
                <TableHead className="text-neon-blue">ID</TableHead>
                <TableHead className="text-neon-blue">Usuário</TableHead>
                <TableHead className="text-neon-blue">Cargo</TableHead>
                <TableHead className="text-neon-blue">Permissões</TableHead>
                <TableHead className="text-neon-blue">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-neon-blue/20">
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="text-white">{user.username}</TableCell>
                  <TableCell className="text-white">{user.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.permissions.map((perm) => (
                        <span key={perm} className="bg-neon-blue/20 text-neon-blue px-2 py-1 rounded text-xs">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="cyber-button mr-2">
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive">
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersSubTab;
