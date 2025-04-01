
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            © 2023 NÜA Barcelona. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-muted-foreground hover:text-nua-navy">
            <Facebook size={18} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-nua-navy">
            <Instagram size={18} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-nua-navy">
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
