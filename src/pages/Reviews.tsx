import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Search, Calendar, Download, MessageCircle, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    customer: 'Ana García',
    date: '24 Jun 2023',
    rating: 5,
    review: 'Excelente experiencia, el personal muy atento y las instalaciones perfectas. Volveré sin duda.',
    sentiment: 'positive',
    responded: true,
  },
  {
    id: 2,
    customer: 'Carlos Martínez',
    date: '20 Jun 2023',
    rating: 4,
    review: 'Muy buena atención, pero tuve que esperar más de lo esperado para ser atendido.',
    sentiment: 'neutral',
    responded: false,
  },
  {
    id: 3,
    customer: 'Elena Ruiz',
    date: '15 Jun 2023',
    rating: 2,
    review: 'No me gustó la atención, esperaba más profesionalidad. El local estaba limpio pero la experiencia fue mala.',
    sentiment: 'negative',
    responded: false,
  },
  {
    id: 4,
    customer: 'Miguel Sánchez',
    date: '10 Jun 2023',
    rating: 5,
    review: 'Fantástico servicio, instalaciones modernas y personal muy cualificado. Recomendable al 100%.',
    sentiment: 'positive',
    responded: true,
  },
  {
    id: 5,
    customer: 'Laura Pérez',
    date: '5 Jun 2023',
    rating: 3,
    review: 'Servicio correcto, pero esperaba más por el precio pagado. Las instalaciones están bien.',
    sentiment: 'neutral',
    responded: false,
  }
];

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Filter reviews based on search query and filters
  const filteredReviews = mockReviews.filter(review => {
    // Filter by search query
    const matchesSearch = 
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      review.review.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by rating
    const matchesRating = 
      ratingFilter === 'all' || 
      review.rating === parseInt(ratingFilter);
    
    // For this example, we'll just apply the search and rating filters
    return matchesSearch && matchesRating;
  });

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < rating ? "text-[#FFCE85] fill-[#FFCE85]" : "text-gray-300"} 
      />
    ));
  };

  // Function to render sentiment emoji
  const renderSentiment = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp size={20} className="text-[#02F2D2]" />;
      case 'neutral':
        return <Meh size={20} className="text-[#FFCB77]" />;
      case 'negative':
        return <ThumbsDown size={20} className="text-[#FE6D73]" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF3]">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2F2F4C]">Reseñas de clientes</h1>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Exportar CSV
            </Button>
          </div>
          
          {/* Filters section */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search input */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar por cliente o palabra clave" 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Date filter */}
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrar por fecha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las fechas</SelectItem>
                    <SelectItem value="today">Hoy</SelectItem>
                    <SelectItem value="week">Esta semana</SelectItem>
                    <SelectItem value="month">Este mes</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Rating filter */}
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-full">
                    <Star className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrar por puntuación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las puntuaciones</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
                    <SelectItem value="2">⭐⭐ (2)</SelectItem>
                    <SelectItem value="1">⭐ (1)</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* View type toggle */}
                <div className="w-full">
                  {/* We keep the UI element but we'll use Tabs components below properly */}
                  <div className="w-full bg-muted p-1 rounded-md h-10 flex items-center justify-center">
                    <div className="flex-1 text-center">Vista tabla</div>
                    <div className="flex-1 text-center">Vista tarjetas</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Reviews display */}
          <Tabs defaultValue="table">
            <TabsList className="hidden">
              <TabsTrigger value="table">Vista tabla</TabsTrigger>
              <TabsTrigger value="cards">Vista tarjetas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Puntuación</TableHead>
                      <TableHead>Reseña</TableHead>
                      <TableHead>Sentimiento</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.customer}</TableCell>
                        <TableCell>{review.date}</TableCell>
                        <TableCell>
                          <div className="flex">{renderStars(review.rating)}</div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="truncate">{review.review}</p>
                        </TableCell>
                        <TableCell>{renderSentiment(review.sentiment)}</TableCell>
                        <TableCell>
                          <Button 
                            variant={review.responded ? "outline" : "default"} 
                            size="sm"
                            className="gap-2"
                          >
                            <MessageCircle size={14} />
                            {review.responded ? "Respondida" : "Responder"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReviews.map((review) => (
                  <Card key={review.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-[#2F2F4C]">{review.customer}</h3>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex space-x-1">{renderStars(review.rating)}</div>
                      </div>
                      
                      <p className="text-sm mb-4">{review.review}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="mr-2">Sentimiento:</span>
                          {renderSentiment(review.sentiment)}
                        </div>
                        <Button 
                          variant={review.responded ? "outline" : "default"} 
                          size="sm"
                          className="gap-2"
                        >
                          <MessageCircle size={14} />
                          {review.responded ? "Respondida" : "Responder"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
