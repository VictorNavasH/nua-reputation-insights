
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const NotificationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificaciones</CardTitle>
        <CardDescription>
          Configura tus preferencias de notificaciones.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Nuevas reseñas</h4>
            <p className="text-sm text-muted-foreground">Recibe notificaciones cuando lleguen nuevas reseñas.</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Reseñas negativas</h4>
            <p className="text-sm text-muted-foreground">Alerta inmediata para reseñas de 1-2 estrellas.</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Resumen semanal</h4>
            <p className="text-sm text-muted-foreground">Informe resumido cada lunes.</p>
          </div>
          <Switch />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-medium">Email</h4>
            <p className="text-sm text-muted-foreground">Recibir notificaciones por email.</p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
