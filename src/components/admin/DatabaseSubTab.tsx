
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const DatabaseSubTab: React.FC = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('');
  const { toast } = useToast();

  const handleRestore = async () => {
    if (!selectedEnvironment) {
      toast({
        title: "Erro",
        description: "Selecione um ambiente",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Restaurando banco:', { environment: selectedEnvironment });
      
      // Simular chamada API
      toast({
        title: "Sucesso",
        description: `Banco restaurado para ambiente: ${selectedEnvironment}`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao restaurar banco",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-neon-orange neon-glow">Restauração de Banco</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neon-blue">Ambiente</label>
            <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
              <SelectTrigger className="cyber-input">
                <SelectValue placeholder="Selecione o ambiente" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-gray border-neon-blue/30">
                <SelectItem value="DEV">DEV</SelectItem>
                <SelectItem value="TESTES">TESTES</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-cyber-gray/30 p-4 rounded-lg border border-neon-orange/30">
            <h4 className="text-neon-orange font-semibold mb-2">⚠️ Atenção</h4>
            <p className="text-sm text-gray-300">
              Esta operação irá restaurar o banco de dados para o ambiente selecionado. 
              Todos os dados atuais serão substituídos.
            </p>
          </div>

          <Button 
            onClick={handleRestore}
            className="w-full cyber-button text-lg font-semibold py-3"
            disabled={!selectedEnvironment}
          >
            <span className="relative z-10">RESTAURAR BANCO</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseSubTab;
