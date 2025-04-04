
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import IntegrationsSection from '@/components/settings/IntegrationsSection';

const IntegrationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integraciones</CardTitle>
        <CardDescription>
          Conecta tu cuenta con otras plataformas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <IntegrationsSection />
      </CardContent>
    </Card>
  );
};

export default IntegrationsTab;
