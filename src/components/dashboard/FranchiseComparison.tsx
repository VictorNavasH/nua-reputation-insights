
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Star } from 'lucide-react';

const data = [
  {
    name: 'NÜA Barcelona',
    reviews: 143,
    rating: 4.7,
    sentiment: 78,
    goals: 85,
  },
  {
    name: 'NÜA Madrid',
    reviews: 122,
    rating: 4.5,
    sentiment: 75,
    goals: 80,
  },
  {
    name: 'NÜA Valencia',
    reviews: 98,
    rating: 4.6,
    sentiment: 72,
    goals: 78,
  },
];

const FranchiseComparison = () => {
  return (
    <div className="mt-6 mb-8">
      <h2 className="text-lg font-semibold text-nua-navy mb-4">Comparativa de Franquicias</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-nua-navy">
              Métricas Clave por Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: 'none'
                    }}
                    labelStyle={{ fontWeight: 600, color: '#2F2F4C' }}
                    formatter={(value, name) => {
                      if (name === 'rating') return [value + '★', 'Media de Valoración'];
                      if (name === 'sentiment') return [value + '%', 'Sentimiento Positivo'];
                      if (name === 'goals') return [value + '%', 'Objetivos Alcanzados'];
                      return [value, name === 'reviews' ? 'Total de Reseñas' : name];
                    }}
                  />
                  <Legend formatter={(value) => {
                    if (value === 'reviews') return 'Total de Reseñas';
                    if (value === 'rating') return 'Media de Valoración';
                    if (value === 'sentiment') return 'Sentimiento Positivo';
                    if (value === 'goals') return 'Objetivos Alcanzados';
                    return value;
                  }} />
                  <Bar dataKey="reviews" fill="#8CA6C5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sentiment" fill="#02B1C4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="goals" fill="#FF4797" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-nua-navy">
              Rendimiento por Franquicia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {data.map((franchise, index) => (
                <div 
                  key={index} 
                  className={`py-4 ${index === 0 ? 'pt-2' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div 
                        className={`w-2 h-10 rounded-full mr-3 ${
                          index === 0 ? 'bg-nua-teal' : 
                          index === 1 ? 'bg-nua-pink' : 'bg-nua-orange'
                        }`}
                      />
                      <div>
                        <h3 className="font-medium text-nua-navy">{franchise.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={i < Math.floor(franchise.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium">{franchise.rating}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-nua-blue-lighter rounded-full">
                      {franchise.reviews} reseñas
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Sentimiento</p>
                      <div className="progress-bar h-1.5">
                        <div 
                          className="h-full absolute" 
                          style={{ 
                            width: `${franchise.sentiment}%`,
                            backgroundColor: index === 0 ? '#02B1C4' : 
                                          index === 1 ? '#FF4797' : '#FFCE85'
                          }} 
                        />
                      </div>
                      <p className="text-xs font-medium mt-1">{franchise.sentiment}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Objetivos</p>
                      <div className="progress-bar h-1.5">
                        <div 
                          className="h-full absolute" 
                          style={{ 
                            width: `${franchise.goals}%`,
                            backgroundColor: index === 0 ? '#02B1C4' : 
                                          index === 1 ? '#FF4797' : '#FFCE85'
                          }} 
                        />
                      </div>
                      <p className="text-xs font-medium mt-1">{franchise.goals}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FranchiseComparison;
