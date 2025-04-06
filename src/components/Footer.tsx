import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-white border-t border-gray-100 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500">© 2025 NÜA Smart Restaurant. Todos los derechos reservados.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-[#FF4797] transition-colors">
            <Facebook size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#FF4797] transition-colors">
            <Instagram size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#FF4797] transition-colors">
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>;
};
export default Footer;