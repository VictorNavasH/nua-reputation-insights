
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Positivo', value: 78, color: '#02B1C4' },
  { name: 'Neutro', value: 15, color: '#8CA6C5' },
  { name: 'Negativo', value: 7, color: '#FE6D73' },
];

const SentimentAnalysis = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card className="bg-white shadow-sm lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-nua-navy">
            Análisis de Sentimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[340px] mt-2"> {/* Increased height for better layout */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%" {/* Moved up slightly to create more space */}
                  labelLine={false} {/* Removed label lines for cleaner look */}
                  outerRadius={75}
                  innerRadius={25} {/* Added inner radius to create a donut chart */}
                  paddingAngle={3}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} {/* Simplified label */}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  isAnimationActive={true}
                  animationDuration={300}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={activeIndex === index ? "#FFFFFF" : "none"}
                      strokeWidth={activeIndex === index ? 2 : 0}
                      // Scale up the active segment slightly
                      {...(activeIndex === index && { 
                        style: { 
                          transform: 'scale(1.05)', 
                          transformOrigin: 'center',
                          transformBox: 'fill-box'
                        } 
                      })}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  labelFormatter={(name) => `Sentimiento: ${name}`}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '8px 12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 flex justify-center space-x-6">
            {data.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center cursor-pointer transition-all duration-200 hover:scale-110" 
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div 
                  className={`w-3.5 h-3.5 rounded-full mr-2 ${activeIndex === index ? 'ring-2 ring-gray-200' : ''}`}
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
            
            <div className="p-4 bg-[#E5F3F5] rounded-lg">
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
