
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Upload, FilePlus, AlertCircle, CheckCircle } from 'lucide-react';

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
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              {!file ? (
                <>
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Arrastra un archivo CSV o haz clic para seleccionarlo
                  </p>
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('csv-file')?.click()}
                  >
                    <FilePlus size={16} className="mr-2" /> Seleccionar archivo
                  </Button>
                </>
              ) : (
                <>
                  <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                  <p className="font-medium mb-1">{file.name}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      Cambiar
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            {file && (
              <>
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
        )}
      </CardContent>
    </Card>
  );
};

export default CsvImportForm;
