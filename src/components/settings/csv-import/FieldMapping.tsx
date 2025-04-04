
import React from 'react';

interface FieldMappingProps {
  isUploading: boolean;
  previewData: any[];
  completeImport: () => Promise<void>;
  setMappingFields: (value: boolean) => void;
}

const FieldMapping: React.FC<FieldMappingProps> = ({
  isUploading,
  previewData,
  completeImport,
  setMappingFields
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Mapeo de campos</h3>
      <p className="text-sm text-muted-foreground">
        Indica a qué campos de tu sistema corresponden las columnas del CSV:
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Nombre de cliente</label>
          <select className="w-full border border-gray-200 rounded-md p-2 mt-1">
            <option>name</option>
            <option>customer_name</option>
            <option>client</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Fecha</label>
          <select className="w-full border border-gray-200 rounded-md p-2 mt-1">
            <option>date</option>
            <option>review_date</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Puntuación</label>
          <select className="w-full border border-gray-200 rounded-md p-2 mt-1">
            <option>rating</option>
            <option>stars</option>
            <option>score</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Texto</label>
          <select className="w-full border border-gray-200 rounded-md p-2 mt-1">
            <option>text</option>
            <option>review_text</option>
            <option>comment</option>
          </select>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 mt-4">
        <h4 className="text-sm font-medium mb-2">Vista previa de datos</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Puntuación</th>
                <th className="p-2 border">Fecha</th>
                <th className="p-2 border">Texto</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="p-2 border">{row.name}</td>
                  <td className="p-2 border">{row.rating}</td>
                  <td className="p-2 border">{row.date}</td>
                  <td className="p-2 border truncate max-w-[200px]">{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setMappingFields(false);
          }}
          disabled={isUploading}
        >
          Atrás
        </Button>
        <Button
          onClick={completeImport}
          disabled={isUploading}
        >
          {isUploading ? 'Importando...' : 'Completar importación'}
        </Button>
      </div>
    </div>
  );
};

// We need to add this missing import
import { Button } from '@/components/ui/button';

export default FieldMapping;
