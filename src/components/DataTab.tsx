
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const DataTab: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const { toast } = useToast();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleApply = async () => {
    if (!selectedDay || !selectedMonth) {
      toast({
        title: "Erro",
        description: "Por favor, selecione dia e mês",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Enviando dados:', { day: parseInt(selectedDay), month: parseInt(selectedMonth) });
      
      // Simular chamada API
      toast({
        title: "Sucesso",
        description: `Data aplicada: ${selectedDay}/${selectedMonth}`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao aplicar data",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-neon-blue neon-glow">Configuração de Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neon-blue">Dia</label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="cyber-input">
                <SelectValue placeholder="Selecione o dia" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-gray border-neon-blue/30">
                {days.map((day) => (
                  <SelectItem key={day} value={day.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neon-blue">Mês</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="cyber-input">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-gray border-neon-blue/30">
                {months.map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleApply}
          className="w-full cyber-button text-lg font-semibold py-3"
          disabled={!selectedDay || !selectedMonth}
        >
          <span className="relative z-10">APLICAR</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataTab;
