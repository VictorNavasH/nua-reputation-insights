
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReviewHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-[#2F2F4C]">Reseñas de clientes</h1>
      <Button variant="outline" className="gap-2">
        <Download size={16} />
        Exportar CSV
      </Button>
    </div>
  );
};

export default ReviewHeader;
