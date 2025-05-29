
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Script {
  name: string;
  size: string;
  lastModified: string;
  path: string;
}

const ScriptsSubTab: React.FC = () => {
  const [scripts] = useState<Script[]>([
    {
      name: 'change_date.sh',
      size: '2.1 KB',
      lastModified: '2024-01-15 14:30:22',
      path: '/opt/scripts/change_date.sh'
    },
    {
      name: 'restore_db.sh',
      size: '3.5 KB', 
      lastModified: '2024-01-14 09:15:45',
      path: '/opt/scripts/restore_db.sh'
    }
  ]);

  const [viewDialog, setViewDialog] = useState<{ open: boolean; script: Script | null }>({
    open: false,
    script: null
  });
  
  const [uploadDialog, setUploadDialog] = useState<{ open: boolean; scriptType: string }>({
    open: false,
    scriptType: ''
  });
  
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleView = (script: Script) => {
    setViewDialog({ open: true, script });
  };

  const handleDownload = (script: Script) => {
    console.log('Baixando script:', script.name);
    toast({
      title: "Download iniciado",
      description: `Baixando ${script.name}`,
    });
  };

  const handleUpload = (scriptType: string) => {
    setUploadDialog({ open: true, scriptType });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/x-sh' && !file.name.endsWith('.sh')) {
        toast({
          title: "Erro",
          description: "Selecione apenas arquivos .sh",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > 64 * 1024) {
        toast({
          title: "Erro", 
          description: "Arquivo muito grande (máximo 64 KiB)",
          variant: "destructive"
        });
        return;
      }
      
      setUploadFile(file);
    }
  };

  const handleConfirmUpload = () => {
    if (!uploadFile) return;
    
    console.log('Upload do script:', {
      file: uploadFile.name,
      type: uploadDialog.scriptType,
      size: uploadFile.size
    });
    
    toast({
      title: "Sucesso",
      description: `Script ${uploadFile.name} enviado com sucesso`,
    });
    
    setUploadDialog({ open: false, scriptType: '' });
    setUploadFile(null);
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-neon-pink neon-glow">Gerenciar Scripts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-neon-blue/30">
                <TableHead className="text-neon-blue">Nome Interno</TableHead>
                <TableHead className="text-neon-blue">Tamanho</TableHead>
                <TableHead className="text-neon-blue">Última Modificação</TableHead>
                <TableHead className="text-neon-blue">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scripts.map((script) => (
                <TableRow key={script.name} className="border-neon-blue/20">
                  <TableCell className="text-white font-mono">{script.name}</TableCell>
                  <TableCell className="text-white">{script.size}</TableCell>
                  <TableCell className="text-white">{script.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="cyber-button text-xs"
                        onClick={() => handleView(script)}
                      >
                        🔍 Ver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="cyber-button text-xs"
                        onClick={() => handleDownload(script)}
                      >
                        ⬇️ Download
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="cyber-button text-xs"
                        onClick={() => handleUpload(script.name.replace('.sh', ''))}
                      >
                        ⬆️ Substituir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para visualizar script */}
      <Dialog open={viewDialog.open} onOpenChange={(open) => setViewDialog({ open, script: null })}>
        <DialogContent className="cyber-card max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-neon-blue">
              Visualizar: {viewDialog.script?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-cyber-darker p-4 rounded border border-neon-blue/30 font-mono text-sm overflow-auto max-h-96">
            <pre className="text-green-400">
{`#!/bin/bash
# Script: ${viewDialog.script?.name}
# Descrição: Script de exemplo para demonstração

echo "Executando ${viewDialog.script?.name}..."

# Código do script aqui
if [ $# -eq 0 ]; then
    echo "Nenhum parâmetro fornecido"
    exit 1
fi

echo "Parâmetros: $@"
echo "Script executado com sucesso!"`}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para upload */}
      <Dialog open={uploadDialog.open} onOpenChange={(open) => setUploadDialog({ open, scriptType: '' })}>
        <DialogContent className="cyber-card">
          <DialogHeader>
            <DialogTitle className="text-neon-pink">
              Substituir Script: {uploadDialog.scriptType}.sh
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neon-blue mb-2">
                Selecionar Arquivo (.sh, máx. 64 KiB)
              </label>
              <Input
                type="file"
                accept=".sh"
                onChange={handleFileSelect}
                className="cyber-input"
              />
              {uploadFile && (
                <p className="text-sm text-neon-green mt-1">
                  Selecionado: {uploadFile.name} ({(uploadFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
            
            <div className="bg-cyber-gray/30 p-3 rounded border border-neon-orange/30">
              <p className="text-sm text-gray-300">
                ⚠️ Este arquivo substituirá o script atual. A mudança terá efeito imediato.
              </p>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setUploadDialog({ open: false, scriptType: '' })}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmUpload}
                className="cyber-button"
                disabled={!uploadFile}
              >
                Confirmar Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScriptsSubTab;
