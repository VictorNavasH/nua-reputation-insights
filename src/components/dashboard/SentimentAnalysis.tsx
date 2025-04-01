
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Positivo', value: 78, color: '#02B1C4' },
  { name: 'Neutro', value: 15, color: '#8CA6C5' },
  { name: 'Negativo', value: 7, color: '#FE6D73' },
];

const SentimentAnalysis = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card className="bg-white shadow-sm lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-nua-navy">
            Análisis de Sentimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  labelFormatter={(name) => `Sentimiento: ${name}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex justify-center space-x-6">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-sm font-medium">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-nua-navy">
            Resumen de Sentimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Basado en las últimas 143 reseñas, el sentimiento general es:
            </p>
            
            <div className="p-4 bg-nua-blue-lighter rounded-lg">
              <h4 className="font-medium text-nua-navy mb-2">Fortalezas destacadas</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Los clientes comentan que la tecnología es impresionante</li>
                <li>El ambiente y diseño del local son muy apreciados</li>
                <li>La calidad de la comida recibe críticas positivas consistentes</li>
              </ul>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-nua-navy mb-2">Áreas de mejora</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Algunos mencionan que el servicio puede mejorar en horas punta</li>
                <li>Ocasionales comentarios sobre tiempos de espera</li>
                <li>Algunas menciones sobre precios elevados</li>
              </ul>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-nua-navy mb-2">Cambios notables</h4>
              <p className="text-sm text-muted-foreground">
                Las menciones positivas sobre la tecnología han aumentado un 15% desde la actualización del sistema el mes pasado. Las críticas sobre el tiempo de espera se han reducido un 8% tras los cambios en el proceso de reserva.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysis;
