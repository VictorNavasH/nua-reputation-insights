
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AppearanceTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apariencia</CardTitle>
        <CardDescription>
          Personaliza la apariencia de tu dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="brand-logo">Logo de la empresa</Label>
          <div className="flex items-center gap-4 mt-2">
            <div className="h-16 w-16 rounded bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Logo</span>
            </div>
            <Button variant="outline">Cambiar logo</Button>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label>Colores de marca</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            <div>
              <Label className="text-xs">Principal</Label>
              <div className="h-10 w-full bg-[#2F2F4C] rounded mt-1"></div>
            </div>
            <div>
              <Label className="text-xs">Secundario</Label>
              <div className="h-10 w-full bg-[#02F2D2] rounded mt-1"></div>
            </div>
            <div>
              <Label className="text-xs">Acento</Label>
              <div className="h-10 w-full bg-[#FFCB77] rounded mt-1"></div>
            </div>
            <div>
              <Label className="text-xs">Alerta</Label>
              <div className="h-10 w-full bg-[#FE6D73] rounded mt-1"></div>
            </div>
          </div>
          <Button className="mt-2">Cambiar colores</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceTab;
