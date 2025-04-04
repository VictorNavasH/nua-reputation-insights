
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AccountTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuenta y Empresa</CardTitle>
        <CardDescription>
          Configura los detalles de tu empresa y cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="company-name">Nombre de la empresa</Label>
          <Input id="company-name" defaultValue="Mi Restaurante" />
        </div>
        <div>
          <Label htmlFor="business-type">Tipo de negocio</Label>
          <Select defaultValue="restaurant">
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restaurant">Restaurante</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
              <SelectItem value="cafe">Café</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="admin-email">Email del administrador</Label>
          <Input id="admin-email" type="email" defaultValue="admin@mirestaurante.com" />
        </div>
        <Button>Guardar cambios</Button>
      </CardContent>
    </Card>
  );
};

export default AccountTab;
