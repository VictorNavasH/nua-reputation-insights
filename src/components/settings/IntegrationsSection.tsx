
import React from 'react';
import { Separator } from '@/components/ui/separator';
import ApiIntegrationForm from './ApiIntegrationForm';
import CsvImportForm from './CsvImportForm';

const IntegrationsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integraciones de API</h3>
        <p className="text-sm text-muted-foreground">
          Conecta con servicios externos para importar reseñas y analizar sentimiento.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <ApiIntegrationForm apiName="Google Reviews" />
        <ApiIntegrationForm apiName="TripAdvisor" />
        <ApiIntegrationForm apiName="Yelp" />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-8">Análisis de sentimiento</h3>
        <p className="text-sm text-muted-foreground">
          Conecta con servicios de procesamiento de lenguaje natural para analizar el sentimiento de las reseñas.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <ApiIntegrationForm apiName="OpenAI Sentiment Analysis" />
        <ApiIntegrationForm apiName="Google NLP" />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-8">Importación de datos</h3>
        <p className="text-sm text-muted-foreground">
          Importa reseñas desde archivos CSV u otros formatos.
        </p>
      </div>
      
      <Separator />
      
      <CsvImportForm />
    </div>
  );
};

export default IntegrationsSection;
