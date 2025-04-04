
import React from 'react';
import { Building, Search, Palette, BellRing, Users, Target, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <nav className="space-y-1">
            <Button 
              variant={activeTab === "account" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("account")}
            >
              <Building className="mr-2 h-5 w-5" />
              Cuenta y Empresa
            </Button>
            <Button 
              variant={activeTab === "integrations" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("integrations")}
            >
              <Search className="mr-2 h-5 w-5" />
              Integraciones
            </Button>
            <Button 
              variant={activeTab === "appearance" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("appearance")}
            >
              <Palette className="mr-2 h-5 w-5" />
              Apariencia
            </Button>
            <Button 
              variant={activeTab === "notifications" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("notifications")}
            >
              <BellRing className="mr-2 h-5 w-5" />
              Notificaciones
            </Button>
            <Button 
              variant={activeTab === "users" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-5 w-5" />
              Usuarios
            </Button>
            <Button 
              variant={activeTab === "goals" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("goals")}
            >
              <Target className="mr-2 h-5 w-5" />
              Objetivos
            </Button>
          </nav>
        </CardContent>
      </Card>
      
      <Card className="border-red-100">
        <CardContent className="p-4">
          <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-5 w-5" />
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSidebar;
