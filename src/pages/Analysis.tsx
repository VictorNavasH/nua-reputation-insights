import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { useReviews } from '@/hooks/useReviews';
import { Loader2 } from 'lucide-react';
const wordMentionsData = [{
  word: 'Servicio',
  count: 42
}, {
  word: 'Atención',
  count: 38
}, {
  word: 'Calidad',
  count: 35
}, {
  word: 'Instalaciones',
  count: 28
}, {
  word: 'Limpieza',
  count: 25
}, {
  word: 'Profesional',
  count: 22
}, {
  word: 'Precio',
  count: 20
}, {
  word: 'Experiencia',
  count: 18
}];
const sentimentTrendData = [{
  date: '01/06',
  positive: 70,
  negative: 15,
  neutral: 15
}, {
  date: '05/06',
  positive: 65,
  negative: 20,
  neutral: 15
}, {
  date: '10/06',
  positive: 75,
  negative: 10,
  neutral: 15
}, {
  date: '15/06',
  positive: 80,
  negative: 10,
  neutral: 10
}, {
  date: '20/06',
  positive: 78,
  negative: 12,
  neutral: 10
}, {
  date: '25/06',
  positive: 85,
  negative: 8,
  neutral: 7
}, {
  date: '30/06',
  positive: 82,
  negative: 8,
  neutral: 10
}];
const sentimentComparisonData = [{
  name: 'Google',
  positive: 78,
  negative: 12,
  neutral: 10
}, {
  name: 'Facebook',
  positive: 72,
  negative: 18,
  neutral: 10
}, {
  name: 'Tripadvisor',
  positive: 68,
  negative: 22,
  neutral: 10
}, {
  name: 'Web',
  positive: 82,
  negative: 8,
  neutral: 10
}];
const WordCloud = () => {
  const wordTags = [{
    text: 'Servicio',
    value: 42
  }, {
    text: 'Atención',
    value: 38
  }, {
    text: 'Calidad',
    value: 35
  }, {
    text: 'Instalaciones',
    value: 28
  }, {
    text: 'Limpieza',
    value: 25
  }, {
    text: 'Profesional',
    value: 22
  }, {
    text: 'Precio',
    value: 20
  }, {
    text: 'Experiencia',
    value: 18
  }, {
    text: 'Ambiente',
    value: 16
  }, {
    text: 'Personal',
    value: 14
  }, {
    text: 'Rápido',
    value: 12
  }, {
    text: 'Amabilidad',
    value: 10
  }, {
    text: 'Volvería',
    value: 9
  }, {
    text: 'Recomendable',
    value: 8
  }, {
    text: 'Tecnología',
    value: 7
  }];
  return <div className="p-4 flex flex-wrap justify-center">
      {wordTags.map((word, index) => {
      const fontSize = Math.max(14, Math.min(36, 12 + word.value / 5));
      const opacity = 0.7 + word.value / 100;
      const colorIndex = Math.floor(word.value / 42 * 100);
      const color = `hsl(${180 - colorIndex * 2}, 80%, 45%)`;
      return <div key={index} className="m-2 px-3 py-1 rounded-full" style={{
        fontSize: `${fontSize}px`,
        opacity,
        color,
        fontWeight: word.value > 25 ? 'bold' : 'normal'
      }}>
            {word.text}
          </div>;
    })}
    </div>;
};
const Analysis = () => {
  const [timeframe, setTimeframe] = useState('month');
  const {
    reviews,
    isLoading,
    error
  } = useReviews();
  const generateRatingDistribution = () => {
    if (!reviews.length) return [];
    const ratingCounts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };
    reviews.forEach(review => {
      const rating = Math.floor(review.rating);
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating]++;
      }
    });
    return Object.entries(ratingCounts).map(([rating, count]) => ({
      rating: `${rating} ★`,
      count,
      ratingValue: parseInt(rating)
    })).sort((a, b) => b.ratingValue - a.ratingValue);
  };
  const ratingDistributionData = generateRatingDistribution();
  const RATING_COLORS = ['#00C49F', '#82ca9d', '#FFBB28', '#edadff', '#edadff'];
  const calculatePercentages = () => {
    if (!ratingDistributionData.length) return [];
    const total = ratingDistributionData.reduce((sum, item) => sum + item.count, 0);
    return ratingDistributionData.map(item => ({
      ...item,
      percentage: total > 0 ? Math.round(item.count / total * 100) : 0
    }));
  };
  const ratingPercentages = calculatePercentages();
  if (isLoading) {
    return <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
        <Header />
        <main className="flex-grow px-6 py-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#02B1C4] mb-4" />
            <p className="text-[#2F2F4C]">Cargando datos de análisis...</p>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#2F2F4C] mb-6">Análisis avanzado de Reseñas</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#02B1C4] to-[#364F6B] pb-2">
                <CardTitle className="text-lg font-medium text-white">Palabras más mencionadas</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={wordMentionsData} layout="vertical" margin={{
                  top: 5,
                  right: 30,
                  left: 70,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="word" type="category" tick={{
                    fontSize: 12
                  }} width={70} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#02B1C4" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#02F2D2] to-[#02B1C4] pb-2">
                <CardTitle className="text-lg font-medium text-white">Evolución del sentimiento</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Tabs defaultValue="month" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="month" onClick={() => setTimeframe('month')}>Este mes</TabsTrigger>
                    <TabsTrigger value="quarter" onClick={() => setTimeframe('quarter')}>Último trimestre</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={sentimentTrendData} margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{
                    fontSize: 12
                  }} />
                    <YAxis tick={{
                    fontSize: 12
                  }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="positive" name="Positivo" stackId="1" stroke="#02F2D2" fill="#02F2D2" />
                    <Area type="monotone" dataKey="neutral" name="Neutro" stackId="1" stroke="#FFCB77" fill="#FFCB77" />
                    <Area type="monotone" dataKey="negative" name="Negativo" stackId="1" stroke="#FE6D73" fill="#FE6D73" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#edadff] to-[#02f2d2] pb-2">
                <CardTitle className="text-lg font-medium text-white">Distribución de puntuaciones</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ratingDistributionData} margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`${value} reseñas`, 'Cantidad']} labelFormatter={label => `Puntuación: ${label}`} />
                    <Bar dataKey="count" name="Cantidad de reseñas">
                      {ratingDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={RATING_COLORS[4 - index]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#edadff] to-[#9b87f5] pb-2">
                <CardTitle className="text-lg font-medium text-white">Distribución porcentual de puntuaciones</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={ratingPercentages} cx="50%" cy="50%" labelLine={true} outerRadius={80} fill="#8884d8" dataKey="count" nameKey="rating" label={({
                    rating,
                    percentage
                  }) => `${rating} (${percentage}%)`}>
                      {ratingPercentages.map((entry, index) => <Cell key={`cell-${index}`} fill={RATING_COLORS[4 - index]} />)}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value} reseñas (${props.payload.percentage}%)`, 'Cantidad']} labelFormatter={label => `Puntuación: ${label}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#FFCE85] to-[#FFCB77] pb-2">
                <CardTitle className="text-lg font-medium text-white">Comparativa de sentimiento por fuente</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sentimentComparisonData} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" name="Positivas" stackId="a" fill="#02F2D2" />
                    <Bar dataKey="neutral" name="Neutras" stackId="a" fill="#FFCB77" />
                    <Bar dataKey="negative" name="Negativas" stackId="a" fill="#FE6D73" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#FF4797] to-[#FE6D73] pb-2">
                <CardTitle className="text-lg font-medium text-white">Nube de palabras</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <WordCloud />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Analysis;