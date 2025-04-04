
import React from 'react';
import { AlertCircle } from 'lucide-react';

const ImportInstructions: React.FC = () => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <h3 className="font-medium">Antes de importar</h3>
      </div>
      <ul className="list-disc list-inside text-sm space-y-1 ml-4">
        <li>Asegúrate de que tu CSV tiene una fila de encabezados</li>
        <li>Comprueba que incluye al menos: nombre, fecha, puntuación y texto</li>
        <li>Máximo 500 reseñas por archivo</li>
      </ul>
    </div>
  );
};

export default ImportInstructions;
