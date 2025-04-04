
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import AccountTab from '../components/settings/tabs/AccountTab';
import IntegrationsTab from '../components/settings/tabs/IntegrationsTab';
import AppearanceTab from '../components/settings/tabs/AppearanceTab';
import NotificationsTab from '../components/settings/tabs/NotificationsTab';
import UsersTab from '../components/settings/tabs/UsersTab';
import GoalsTab from '../components/settings/tabs/GoalsTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2F2F4C]">Configuración</h1>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]">
            {/* Sidebar */}
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Main Content */}
            <div>
              {activeTab === "account" && <AccountTab />}
              {activeTab === "integrations" && <IntegrationsTab />}
              {activeTab === "appearance" && <AppearanceTab />}
              {activeTab === "notifications" && <NotificationsTab />}
              {activeTab === "users" && <UsersTab />}
              {activeTab === "goals" && <GoalsTab />}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
