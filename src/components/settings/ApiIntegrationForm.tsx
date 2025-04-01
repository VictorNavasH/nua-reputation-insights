
import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ApiConfig } from '@/types/dashboard';
import { Lock, Key, RefreshCw } from 'lucide-react';

interface ApiIntegrationFormProps {
  apiName: string;
}

const ApiIntegrationForm: React.FC<ApiIntegrationFormProps> = ({ apiName }) => {
  const { apiConfigs, updateApiConfig } = useDashboard();
  
  const apiConfig = apiConfigs.find(config => config.name === apiName) || {
    name: apiName,
    enabled: false
  };
  
  const [isEnabled, setIsEnabled] = useState(apiConfig.enabled);
  const [apiKey, setApiKey] = useState(apiConfig.apiKey || '');
  const [endpoint, setEndpoint] = useState(apiConfig.endpoint || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
  };
  
  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      
      // Simular delay de llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Actualizar configuración
      updateApiConfig({
        ...apiConfig,
        enabled: isEnabled,
        apiKey: apiKey,
        endpoint: endpoint,
        lastSync: isEnabled ? new Date().toISOString() : apiConfig.lastSync
      });
      
      toast({
        title: "Configuración guardada",
        description: `La integración con ${apiName} ha sido ${isEnabled ? 'activada' : 'desactivada'}.`,
      });
      
      setIsSubmitting(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudo guardar la configuración. Inténtalo de nuevo.`,
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  // Determinar qué campos mostrar según el tipo de API
  const showApiKey = apiName.includes('Google') || apiName.includes('OpenAI') || apiName === 'Yelp';
  const showEndpoint = apiName.includes('TripAdvisor') || apiName === 'Custom API';
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{apiName}</CardTitle>
          <div className="flex items-center gap-2">
            <Label htmlFor={`enable-${apiName.toLowerCase().replace(/\s+/g, '-')}`} className="cursor-pointer">
              {isEnabled ? 'Activado' : 'Desactivado'}
            </Label>
            <Switch
              id={`enable-${apiName.toLowerCase().replace(/\s+/g, '-')}`}
              checked={isEnabled}
              onCheckedChange={handleToggle}
            />
          </div>
        </div>
        {apiConfig.lastSync && (
          <p className="text-xs text-muted-foreground mt-1">
            Última sincronización: {new Date(apiConfig.lastSync).toLocaleString()}
          </p>
        )}
      </CardHeader>
      {isEnabled && (
        <CardContent className="space-y-4">
          {showApiKey && (
            <div>
              <Label htmlFor={`api-key-${apiName}`} className="flex items-center mb-1">
                <Key size={14} className="mr-1" /> API Key
              </Label>
              <div className="flex gap-2">
                <Input
                  id={`api-key-${apiName}`}
                  type="password"
                  placeholder="Ingresa tu API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                {apiKey && (
                  <Button
                    variant="outline" 
                    size="icon"
                    onClick={() => setApiKey('')}
                    type="button"
                  >
                    <Lock size={16} />
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {showEndpoint && (
            <div>
              <Label htmlFor={`endpoint-${apiName}`} className="block mb-1">Endpoint</Label>
              <Input
                id={`endpoint-${apiName}`}
                placeholder="https://api.example.com/v1"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
              />
            </div>
          )}
          
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setApiKey(apiConfig.apiKey || '');
                setEndpoint(apiConfig.endpoint || '');
                setIsEnabled(apiConfig.enabled);
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <div className="flex gap-2">
              {isEnabled && (
                <Button
                  variant="outline"
                  onClick={async () => {
                    toast({
                      title: "Sincronizando",
                      description: `Sincronizando datos con ${apiName}...`,
                    });
                    // Aquí iría la lógica de sincronización real
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    toast({
                      title: "Sincronización completada",
                      description: `Los datos de ${apiName} han sido actualizados.`,
                    });
                    updateApiConfig({
                      ...apiConfig,
                      lastSync: new Date().toISOString()
                    });
                  }}
                >
                  <RefreshCw size={16} className="mr-2" /> Sincronizar
                </Button>
              )}
              <Button
                onClick={handleSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ApiIntegrationForm;
