
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import FileUpload from './csv-import/FileUpload';
import ImportInstructions from './csv-import/ImportInstructions';
import FieldMapping from './csv-import/FieldMapping';

const CsvImportForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mappingFields, setMappingFields] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  
  // Función simulada para procesar el archivo CSV
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Comprobar que es un archivo CSV
      if (selectedFile.name.endsWith('.csv') || selectedFile.type === 'text/csv') {
        setFile(selectedFile);
        
        // En una implementación real, aquí se analizaría el CSV para vista previa
        // Por ahora simulamos algunos datos
        setTimeout(() => {
          setPreviewData([
            { name: 'María García', rating: 5, date: '2023-06-23', text: 'Excelente servicio...' },
            { name: 'Carlos Pérez', rating: 4, date: '2023-06-18', text: 'Muy buen ambiente...' }
          ]);
        }, 500);
      } else {
        toast({
          title: "Formato no válido",
          description: "Por favor, selecciona un archivo CSV.",
          variant: "destructive",
        });
        setFile(null);
      }
    }
  };
  
  // Función simulada para procesar la importación
  const handleImport = async () => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Simular proceso de carga
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mostrar pantalla de mapeo de campos
      setMappingFields(true);
      setIsUploading(false);
    } catch (error) {
      toast({
        title: "Error en importación",
        description: "No se pudo procesar el archivo. Inténtalo de nuevo.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };
  
  // Función simulada para completar la importación después del mapeo
  const completeImport = async () => {
    try {
      setIsUploading(true);
      
      // Simular proceso de importación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Importación completada",
        description: "Se han importado 2 reseñas correctamente.",
      });
      
      // Reiniciar el formulario
      setFile(null);
      setMappingFields(false);
      setPreviewData([]);
      setIsUploading(false);
    } catch (error) {
      toast({
        title: "Error en importación",
        description: "No se pudo completar la importación. Inténtalo de nuevo.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Importar datos desde CSV</CardTitle>
      </CardHeader>
      <CardContent>
        {!mappingFields ? (
          <div className="space-y-4">
            <FileUpload 
              file={file}
              setFile={setFile}
              handleFileChange={handleFileChange}
            />
            
            {file && (
              <>
                <ImportInstructions />
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleImport}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Procesando...' : 'Importar CSV'}
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <FieldMapping
            isUploading={isUploading}
            previewData={previewData}
            completeImport={completeImport}
            setMappingFields={setMappingFields}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CsvImportForm;
