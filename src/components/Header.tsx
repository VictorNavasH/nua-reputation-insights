
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
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-12">
        {/* Logo and title */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/c498e84d-246f-473c-9083-d0e6c74beabf.png" 
            alt="NÜA SMART RESTAURANT" 
            className="h-8" 
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" path="/" active={currentPath === '/'} />
          <NavItem icon={<MessageSquare size={18} />} label="Reseñas" path="/reviews" active={currentPath === '/reviews'} />
          <NavItem icon={<BarChart2 size={18} />} label="Análisis" path="/analysis" active={currentPath === '/analysis'} />
          <NavItem icon={<Target size={18} />} label="Objetivos" path="/goals" active={currentPath === '/goals'} />
          <NavItem icon={<Settings size={18} />} label="Configuración" path="/settings" active={currentPath === '/settings'} />
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications - removed the red dot */}
        <Button variant="ghost" size="icon">
          <Bell size={20} className="text-[#2F2F4C]" />
        </Button>
        
        {/* Location selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2 border border-gray-200">
              <div className="w-7 h-7 bg-[#364F6B] rounded-full flex items-center justify-center text-white text-xs font-medium">B</div>
              <span className="font-medium text-sm text-[#2F2F4C]">NÜA Barcelona</span>
              <ChevronDown size={16} className="text-gray-400" />
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
  path: string;
  active?: boolean;
}

const NavItem = ({ icon, label, path, active }: NavItemProps) => (
  <Link 
    to={path}
    className={`flex items-center text-sm font-medium relative ${
      active 
        ? 'text-[#2F2F4C]' 
        : 'text-gray-500 hover:text-[#2F2F4C] transition-colors'
    }`}
  >
    <span className="mr-2">{icon}</span>
    {label}
    {active && <div className="absolute -bottom-4 left-0 w-full h-0.5 bg-[#02B1C4]"></div>}
  </Link>
);

export default Header;
