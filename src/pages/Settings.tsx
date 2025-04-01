
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Google,
  Globe,
  MessagesSquare,
  Bell,
  Users,
  ChevronRight,
  LogIn,
  Settings as SettingsIcon,
  Upload,
  Save,
  Palette,
  Check
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [brandColor, setBrandColor] = useState('#02B1C4');
  const [secondaryColor, setSecondaryColor] = useState('#FF4797');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLogoFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#2F2F4C] mb-6">Configuración</h1>
          
          <Tabs defaultValue="connections" className="space-y-6">
            <TabsList className="mb-4">
              <TabsTrigger value="connections">Conexiones</TabsTrigger>
              <TabsTrigger value="brand">Marca</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
            </TabsList>
            
            {/* Connections Tab */}
            <TabsContent value="connections">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fuentes de Reseñas</CardTitle>
                    <CardDescription>Conecta tu negocio con diferentes plataformas para importar reseñas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <Google className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Google Business Profile</h3>
                            <p className="text-sm text-gray-500">Importar reseñas desde Google</p>
                          </div>
                        </div>
                        <Button>Conectar</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <Globe className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Tripadvisor</h3>
                            <p className="text-sm text-gray-500">Importar reseñas desde Tripadvisor</p>
                          </div>
                        </div>
                        <Button variant="outline">Conectar</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <MessagesSquare className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">API de Zoho</h3>
                            <p className="text-sm text-gray-500">Integración con Zoho CRM</p>
                          </div>
                        </div>
                        <Button variant="outline">Conectar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Ajustes de API</CardTitle>
                    <CardDescription>Configura y gestiona las claves de API</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="api-key">Clave de API</Label>
                        <div className="flex gap-2">
                          <Input
                            id="api-key"
                            type="password"
                            defaultValue="sk_live_12345abcdef"
                            readOnly
                          />
                          <Button variant="outline">Mostrar</Button>
                          <Button variant="outline">Regenerar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Brand Tab */}
            <TabsContent value="brand">
              <Card>
                <CardHeader>
                  <CardTitle>Personalización de marca</CardTitle>
                  <CardDescription>Personaliza la apariencia de tu panel con tus colores y logo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label>Logo de la empresa</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 border rounded-lg flex items-center justify-center overflow-hidden bg-white">
                          {logoPreview ? (
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="max-w-full max-h-full object-contain" 
                            />
                          ) : (
                            <SettingsIcon className="h-8 w-8 text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <Input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                          <Label htmlFor="logo-upload" asChild>
                            <Button variant="outline" className="gap-2 cursor-pointer">
                              <Upload size={16} />
                              Subir logo
                            </Button>
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">Recomendado: 512x512px, PNG o SVG</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="primary-color">Color primario</Label>
                        <div className="flex gap-2 items-center">
                          <div 
                            className="w-10 h-10 rounded-lg border" 
                            style={{ backgroundColor: brandColor }}
                          />
                          <Input
                            id="primary-color"
                            type="color"
                            value={brandColor}
                            onChange={(e) => setBrandColor(e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={brandColor}
                            onChange={(e) => setBrandColor(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="secondary-color">Color secundario</Label>
                        <div className="flex gap-2 items-center">
                          <div 
                            className="w-10 h-10 rounded-lg border" 
                            style={{ backgroundColor: secondaryColor }}
                          />
                          <Input
                            id="secondary-color"
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Vista previa</Label>
                      <div className="border rounded-lg p-4 bg-white">
                        <div className="flex items-center gap-3 mb-4">
                          {logoPreview ? (
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="w-8 h-8 object-contain" 
                            />
                          ) : (
                            <div 
                              className="w-8 h-8 flex items-center justify-center rounded text-white font-bold" 
                              style={{ background: `linear-gradient(to right, ${brandColor}, ${secondaryColor})` }}
                            >
                              N
                            </div>
                          )}
                          <span className="font-medium">NÜA Smart Reputation</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button style={{ backgroundColor: brandColor }}>Botón primario</Button>
                          <Button variant="outline" style={{ borderColor: secondaryColor, color: secondaryColor }}>
                            Botón secundario
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="gap-2 w-full md:w-auto md:self-end">
                      <Save size={16} />
                      Guardar cambios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notificaciones</CardTitle>
                  <CardDescription>Configura cuándo y cómo quieres recibir alertas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">Nuevas reseñas</h3>
                        <p className="text-sm text-gray-500">Recibe alertas cuando lleguen nuevas reseñas</p>
                      </div>
                      <Switch id="new-reviews-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">Reseñas negativas</h3>
                        <p className="text-sm text-gray-500">Alerta especial para reseñas de 1-2 estrellas</p>
                      </div>
                      <Switch id="negative-reviews-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">Informes semanales</h3>
                        <p className="text-sm text-gray-500">Resumen semanal de actividad</p>
                      </div>
                      <Switch id="weekly-reports-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">Informes mensuales</h3>
                        <p className="text-sm text-gray-500">Informe detallado de fin de mes</p>
                      </div>
                      <Switch id="monthly-reports-notifications" defaultChecked />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="notification-email">Email para notificaciones</Label>
                      <Input
                        id="notification-email"
                        type="email"
                        defaultValue="admin@nua.com"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    
                    <Button className="gap-2 w-full md:w-auto md:self-end">
                      <Save size={16} />
                      Guardar preferencias
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de usuarios</CardTitle>
                  <CardDescription>Administra los usuarios y sus permisos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* List of users */}
                    <div className="border rounded-lg divide-y">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#364F6B] rounded-full flex items-center justify-center text-white mr-3">
                            A
                          </div>
                          <div>
                            <h3 className="font-medium">Admin NÜA</h3>
                            <p className="text-sm text-gray-500">admin@nua.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Administrador</span>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#02B1C4] rounded-full flex items-center justify-center text-white mr-3">
                            F
                          </div>
                          <div>
                            <h3 className="font-medium">Franquiciado Barcelona</h3>
                            <p className="text-sm text-gray-500">barcelona@nua.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Franquiciado</span>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#FF4797] rounded-full flex items-center justify-center text-white mr-3">
                            G
                          </div>
                          <div>
                            <h3 className="font-medium">Gestor Marketing</h3>
                            <p className="text-sm text-gray-500">marketing@nua.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Gestor</span>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Add new user */}
                    <Card className="border border-dashed bg-transparent shadow-none">
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                        <Users className="h-12 w-12 text-gray-400 mb-3" />
                        <h3 className="font-medium text-gray-600 mb-1">Añadir nuevo usuario</h3>
                        <p className="text-sm text-gray-500 mb-4">Invita a un nuevo miembro del equipo</p>
                        <Button className="gap-2">
                          <LogIn size={16} />
                          Invitar usuario
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* Role permissions */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Roles y permisos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">Administrador</span>
                            <span className="text-xs text-gray-500">Acceso completo</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">Franquiciado</span>
                            <span className="text-xs text-gray-500">Acceso a sus ubicaciones</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="font-medium">Gestor</span>
                            <span className="text-xs text-gray-500">Solo visualización</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
