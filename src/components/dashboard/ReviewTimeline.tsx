
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data 
const last30DaysData = [
  { date: '1 Jun', reviews: 4, rating: 4.5 },
  { date: '5 Jun', reviews: 2, rating: 4.0 },
  { date: '10 Jun', reviews: 7, rating: 4.7 },
  { date: '15 Jun', reviews: 3, rating: 4.3 },
  { date: '20 Jun', reviews: 5, rating: 4.8 },
  { date: '25 Jun', reviews: 6, rating: 4.2 },
  { date: '30 Jun', reviews: 8, rating: 4.6 }
];

const last3MonthsData = [
  { date: 'Abril', reviews: 34, rating: 4.3 },
  { date: 'Mayo', reviews: 42, rating: 4.5 },
  { date: 'Junio', reviews: 35, rating: 4.6 }
];

const lastYearData = [
  { date: 'Jul', reviews: 25, rating: 4.1 },
  { date: 'Ago', reviews: 30, rating: 4.2 },
  { date: 'Sep', reviews: 28, rating: 4.3 },
  { date: 'Oct', reviews: 32, rating: 4.4 },
  { date: 'Nov', reviews: 35, rating: 4.3 },
  { date: 'Dic', reviews: 40, rating: 4.5 },
  { date: 'Ene', reviews: 38, rating: 4.4 },
  { date: 'Feb', reviews: 32, rating: 4.5 },
  { date: 'Mar', reviews: 36, rating: 4.6 },
  { date: 'Abr', reviews: 34, rating: 4.3 },
  { date: 'May', reviews: 42, rating: 4.5 },
  { date: 'Jun', reviews: 35, rating: 4.6 }
];

const TimelineChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }} 
          tickLine={false}
        />
        <YAxis 
          yAxisId="left"
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[1, 5]}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: 'none'
          }}
          labelStyle={{ fontWeight: 600, color: '#2F2F4C' }}
        />
        <Legend verticalAlign="top" height={36} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="reviews"
          name="Número de Reseñas"
          stroke="#02B1C4"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="rating"
          name="Puntuación Media"
          stroke="#FF4797"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ReviewTimeline = () => {
  return (
    <Card className="mt-6 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-nua-navy">
          Evolución de Reseñas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="30days">
          <TabsList className="mb-4">
            <TabsTrigger value="30days">Últimos 30 días</TabsTrigger>
            <TabsTrigger value="3months">Últimos 3 meses</TabsTrigger>
            <TabsTrigger value="year">Último año</TabsTrigger>
          </TabsList>
          <TabsContent value="30days">
            <TimelineChart data={last30DaysData} />
          </TabsContent>
          <TabsContent value="3months">
            <TimelineChart data={last3MonthsData} />
          </TabsContent>
          <TabsContent value="year">
            <TimelineChart data={lastYearData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReviewTimeline;
