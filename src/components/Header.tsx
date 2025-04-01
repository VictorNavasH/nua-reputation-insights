
import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart2, 
  Target, 
  Settings, 
  ChevronDown,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-12">
        {/* Logo and title */}
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-nua-teal to-nua-blue2 text-white font-bold text-xl px-3 py-2 rounded-md">
            NÜA
          </div>
          <h1 className="ml-3 font-semibold text-nua-navy text-xl">Smart Reputation</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavItem icon={<LayoutDashboard size={18} />} label="Inicio" active />
          <NavItem icon={<MessageSquare size={18} />} label="Reseñas" />
          <NavItem icon={<BarChart2 size={18} />} label="Sentimiento" />
          <NavItem icon={<Target size={18} />} label="Objetivos" />
          <NavItem icon={<Settings size={18} />} label="Configuración" />
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-nua-red rounded-full"></span>
        </Button>
        
        {/* Location selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-nua-navy rounded-full flex items-center justify-center text-white text-xs">B</div>
              <span className="font-medium text-sm">NÜA Barcelona</span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>NÜA Barcelona</DropdownMenuItem>
            <DropdownMenuItem>NÜA Madrid</DropdownMenuItem>
            <DropdownMenuItem>NÜA Valencia</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ icon, label, active }: NavItemProps) => (
  <a 
    href="#" 
    className={`flex items-center text-sm font-medium ${
      active 
        ? 'text-nua-navy' 
        : 'text-gray-500 hover:text-nua-navy transition-colors'
    }`}
  >
    <span className="mr-2">{icon}</span>
    {label}
    {active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-nua-teal"></div>}
  </a>
);

export default Header;
