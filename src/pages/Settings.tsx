
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Users, 
  Building, 
  BellRing, 
  Search, 
  Palette, 
  LogOut, 
  Target
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GoalsConfiguration } from '@/components/settings/GoalsConfiguration';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2F2F4C]">Configuración</h1>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]">
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    <Button 
                      variant={activeTab === "account" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("account")}
                    >
                      <Building className="mr-2 h-5 w-5" />
                      Cuenta y Empresa
                    </Button>
                    <Button 
                      variant={activeTab === "integrations" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("integrations")}
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Integraciones
                    </Button>
                    <Button 
                      variant={activeTab === "appearance" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("appearance")}
                    >
                      <Palette className="mr-2 h-5 w-5" />
                      Apariencia
                    </Button>
                    <Button 
                      variant={activeTab === "notifications" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <BellRing className="mr-2 h-5 w-5" />
                      Notificaciones
                    </Button>
                    <Button 
                      variant={activeTab === "users" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("users")}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Usuarios
                    </Button>
                    <Button 
                      variant={activeTab === "goals" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("goals")}
                    >
                      <Target className="mr-2 h-5 w-5" />
                      Objetivos
                    </Button>
                  </nav>
                </CardContent>
              </Card>
              
              <Card className="border-red-100">
                <CardContent className="p-4">
                  <Button variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-5 w-5" />
                    Cerrar sesión
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div>
              {activeTab === "account" && (
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
              )}
              
              {activeTab === "integrations" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Integraciones</CardTitle>
                    <CardDescription>
                      Conecta tu cuenta con otras plataformas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Search className="h-6 w-6 mr-2" />
                          <h4 className="font-medium">Google Business Profile</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Conecta tu cuenta de Google Business para importar reseñas.
                        </p>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <h4 className="font-medium">API de Zoho</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Integra tu cuenta de Zoho para sincronizar datos de clientes.
                        </p>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === "appearance" && (
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
              )}
              
              {activeTab === "notifications" && (
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
              )}
              
              {activeTab === "users" && (
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
              )}

              {activeTab === "goals" && (
                <GoalsConfiguration />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
