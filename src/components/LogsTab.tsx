
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  source: string;
  message: string;
}

const LogsTab: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: '2024-01-15 14:30:22',
      level: 'INFO',
      source: 'system',
      message: 'Sistema iniciado com sucesso'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:31:15',
      level: 'SUCCESS',
      source: 'change_date.sh',
      message: 'Data alterada para 15/01'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:32:08',
      level: 'WARN',
      source: 'restore_db.sh',
      message: 'Backup não encontrado, usando padrão'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:33:42',
      level: 'ERROR',
      source: 'system',
      message: 'Falha na conexão com banco de dados'
    }
  ]);

  useEffect(() => {
    // Simular logs em tempo real
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('pt-BR'),
        level: ['INFO', 'WARN', 'ERROR', 'SUCCESS'][Math.floor(Math.random() * 4)] as LogEntry['level'],
        source: ['system', 'change_date.sh', 'restore_db.sh'][Math.floor(Math.random() * 3)],
        message: [
          'Operação executada com sucesso',
          'Processamento em andamento',
          'Backup criado automaticamente',
          'Script executado pelo usuário admin',
          'Verificação de integridade concluída'
        ][Math.floor(Math.random() * 5)]
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 49)]); // Manter apenas os 50 logs mais recentes
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'WARN':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'SUCCESS':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-neon-yellow neon-glow">Logs do Sistema</CardTitle>
        <p className="text-sm text-gray-400">
          Monitoramento em tempo real • {logs.length} entradas
        </p>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-neon-blue/30">
                <TableHead className="text-neon-blue">Timestamp</TableHead>
                <TableHead className="text-neon-blue">Nível</TableHead>
                <TableHead className="text-neon-blue">Origem</TableHead>
                <TableHead className="text-neon-blue">Mensagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-neon-blue/20">
                  <TableCell className="text-gray-300 font-mono text-xs">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getLevelColor(log.level)} text-xs`}>
                      {log.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white font-mono text-sm">
                    {log.source}
                  </TableCell>
                  <TableCell className="text-gray-200">
                    {log.message}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogsTab;
