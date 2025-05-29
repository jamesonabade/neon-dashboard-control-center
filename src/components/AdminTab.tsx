
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersSubTab from './admin/UsersSubTab';
import SystemSubTab from './admin/SystemSubTab';
import DatabaseSubTab from './admin/DatabaseSubTab';
import ScriptsSubTab from './admin/ScriptsSubTab';

const AdminTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('users');

  return (
    <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-cyber-gray/50 mb-6">
        <TabsTrigger 
          value="users" 
          className={`cyber-button text-sm ${activeSubTab === 'users' ? 'tab-active' : ''}`}
        >
          Usuários
        </TabsTrigger>
        <TabsTrigger 
          value="system" 
          className={`cyber-button text-sm ${activeSubTab === 'system' ? 'tab-active' : ''}`}
        >
          Sistema
        </TabsTrigger>
        <TabsTrigger 
          value="database" 
          className={`cyber-button text-sm ${activeSubTab === 'database' ? 'tab-active' : ''}`}
        >
          Banco
        </TabsTrigger>
        <TabsTrigger 
          value="scripts" 
          className={`cyber-button text-sm ${activeSubTab === 'scripts' ? 'tab-active' : ''}`}
        >
          Scripts
        </TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <UsersSubTab />
      </TabsContent>

      <TabsContent value="system">
        <SystemSubTab />
      </TabsContent>

      <TabsContent value="database">
        <DatabaseSubTab />
      </TabsContent>

      <TabsContent value="scripts">
        <ScriptsSubTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTab;
