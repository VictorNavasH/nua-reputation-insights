
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
  TooltipProps
} from 'recharts';
import { AreaChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for last 30 days
const last30DaysData = [
  { date: '1 Jun', reviews: 1 },
  { date: '2 Jun', reviews: 2 },
  { date: '3 Jun', reviews: 0 },
  { date: '4 Jun', reviews: 3 },
  { date: '5 Jun', reviews: 2 },
  { date: '6 Jun', reviews: 1 },
  { date: '7 Jun', reviews: 4 },
  { date: '8 Jun', reviews: 2 },
  { date: '9 Jun', reviews: 1 },
  { date: '10 Jun', reviews: 3 },
  { date: '11 Jun', reviews: 0 },
  { date: '12 Jun', reviews: 2 },
  { date: '13 Jun', reviews: 1 },
  { date: '14 Jun', reviews: 1 },
  { date: '15 Jun', reviews: 2 },
  { date: '16 Jun', reviews: 3 },
  { date: '17 Jun', reviews: 0 },
  { date: '18 Jun', reviews: 1 },
  { date: '19 Jun', reviews: 2 },
  { date: '20 Jun', reviews: 0 },
  { date: '21 Jun', reviews: 1 },
  { date: '22 Jun', reviews: 3 },
  { date: '23 Jun', reviews: 2 },
  { date: '24 Jun', reviews: 1 },
  { date: '25 Jun', reviews: 0 },
  { date: '26 Jun', reviews: 2 },
  { date: '27 Jun', reviews: 1 },
  { date: '28 Jun', reviews: 3 },
  { date: '29 Jun', reviews: 2 },
  { date: '30 Jun', reviews: 1 }
];

// Sample data for last 3 months
const last3MonthsData = [
  { date: 'Abril', reviews: 34 },
  { date: 'Mayo', reviews: 42 },
  { date: 'Junio', reviews: 35 }
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-lg border border-gray-100">
        <p className="text-xs font-medium text-[#2F2F4C]">{label}</p>
        <p className="text-sm font-semibold text-[#02B1C4]">
          {payload[0].value} {payload[0].value === 1 ? 'reseña' : 'reseñas'}
        </p>
      </div>
    );
  }

  return null;
};

const TimelineChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 5,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12, fill: "#6B7280" }} 
          tickLine={false}
          axisLine={{ stroke: '#E5E7EB' }}
          interval={data.length > 10 ? 6 : 0}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: "#6B7280" }} 
          tickLine={false}
          axisLine={false}
          domain={[0, 'dataMax + 1']}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#02B1C4" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#02F2D2" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="reviews"
          stroke="#02B1C4"
          strokeWidth={3}
          dot={{ r: 4, fill: "#02B1C4", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6, strokeWidth: 0, fill: "#FF4797" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ReviewsTimeline = () => {
  return (
    <Card className="bg-white shadow-md border-0 rounded-xl overflow-hidden mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <AreaChart className="h-5 w-5 mr-2 text-[#02B1C4]" />
          <CardTitle className="text-lg font-semibold text-[#2F2F4C]">
            Evolución de reseñas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="30days">
          <TabsList className="mb-4">
            <TabsTrigger value="30days">Últimos 30 días</TabsTrigger>
            <TabsTrigger value="3months">Últimos 3 meses</TabsTrigger>
          </TabsList>
          <p className="text-sm text-[#2F2F4C]/70 mb-4">Cantidad de reseñas diarias recibidas</p>
          <TabsContent value="30days">
            <TimelineChart data={last30DaysData} />
          </TabsContent>
          <TabsContent value="3months">
            <TimelineChart data={last3MonthsData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReviewsTimeline;
