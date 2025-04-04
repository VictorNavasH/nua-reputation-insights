
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UsersTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de usuarios</CardTitle>
        <CardDescription>
          Administra los usuarios que tienen acceso al dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between mb-4">
            <Input placeholder="Buscar usuarios..." className="max-w-sm" />
            <Button>
              Añadir usuario
            </Button>
          </div>
          
          <div className="border rounded-lg">
            <div className="grid grid-cols-12 p-3 bg-muted text-sm font-medium">
              <div className="col-span-4">Usuario</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-3">Rol</div>
              <div className="col-span-2">Acciones</div>
            </div>
            
            <div className="grid grid-cols-12 p-3 items-center border-t">
              <div className="col-span-4 font-medium">Ana García</div>
              <div className="col-span-3 text-muted-foreground">ana@mirestaurante.com</div>
              <div className="col-span-3">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                  Administrador
                </span>
              </div>
              <div className="col-span-2 space-x-2">
                <Button variant="ghost" size="sm">Editar</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-12 p-3 items-center border-t">
              <div className="col-span-4 font-medium">Carlos López</div>
              <div className="col-span-3 text-muted-foreground">carlos@mirestaurante.com</div>
              <div className="col-span-3">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                  Franquiciado
                </span>
              </div>
              <div className="col-span-2 space-x-2">
                <Button variant="ghost" size="sm">Editar</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-12 p-3 items-center border-t">
              <div className="col-span-4 font-medium">Elena Ruiz</div>
              <div className="col-span-3 text-muted-foreground">elena@mirestaurante.com</div>
              <div className="col-span-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Empleado
                </span>
              </div>
              <div className="col-span-2 space-x-2">
                <Button variant="ghost" size="sm">Editar</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersTab;
