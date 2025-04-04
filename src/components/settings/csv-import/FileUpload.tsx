
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, FilePlus, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  setFile,
  handleFileChange
}) => {
  return (
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
  );
};

export default FileUpload;
