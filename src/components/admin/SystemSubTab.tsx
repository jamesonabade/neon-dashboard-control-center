
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const SystemSubTab: React.FC = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [wallpaperFile, setWallpaperFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/png') {
      setLogoFile(file);
      toast({
        title: "Logo selecionado",
        description: file.name,
      });
    } else {
      toast({
        title: "Erro",
        description: "Selecione um arquivo PNG válido",
        variant: "destructive"
      });
    }
  };

  const handleWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setWallpaperFile(file);
      toast({
        title: "Papel de parede selecionado",
        description: file.name,
      });
    } else {
      toast({
        title: "Erro",
        description: "Selecione um arquivo JPG ou PNG válido",
        variant: "destructive"
      });
    }
  };

  const handleSaveAssets = () => {
    console.log('Salvando assets:', { logoFile, wallpaperFile });
    toast({
      title: "Sucesso",
      description: "Assets salvos em /data/assets/",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-neon-green neon-glow">Configurações do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neon-blue mb-2">
                  Logo (PNG)
                </label>
                <Input
                  type="file"
                  accept=".png"
                  onChange={handleLogoUpload}
                  className="cyber-input"
                />
                {logoFile && (
                  <p className="text-sm text-neon-green mt-1">
                    Selecionado: {logoFile.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neon-blue mb-2">
                  Papel de Parede (JPG/PNG)
                </label>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleWallpaperUpload}
                  className="cyber-input"
                />
                {wallpaperFile && (
                  <p className="text-sm text-neon-green mt-1">
                    Selecionado: {wallpaperFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSaveAssets}
            className="w-full cyber-button text-lg font-semibold py-3"
            disabled={!logoFile && !wallpaperFile}
          >
            <span className="relative z-10">SALVAR ASSETS</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSubTab;
