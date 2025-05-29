
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataTab from './DataTab';
import AdminTab from './AdminTab';
import LogsTab from './LogsTab';
import Header from './Header';

interface DashboardProps {
  user: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('data');

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="cyber-card p-6 animate-fade-in">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-cyber-gray/50 mb-8">
              <TabsTrigger 
                value="data" 
                className={`cyber-button ${activeTab === 'data' ? 'tab-active' : ''}`}
              >
                Data
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className={`cyber-button ${activeTab === 'admin' ? 'tab-active' : ''}`}
              >
                Administração
              </TabsTrigger>
              <TabsTrigger 
                value="logs" 
                className={`cyber-button ${activeTab === 'logs' ? 'tab-active' : ''}`}
              >
                Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="data" className="space-y-6">
              <DataTab />
            </TabsContent>

            <TabsContent value="admin" className="space-y-6">
              <AdminTab />
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <LogsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
