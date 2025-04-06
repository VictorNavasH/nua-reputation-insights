
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Search, Calendar, Download, MessageCircle, ThumbsUp, ThumbsDown, Meh, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReviewResponseDialog from '@/components/reviews/ReviewResponseDialog';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

// Interfaz para los datos de reseñas
interface Review {
  id: number;
  UUID: string;
  customer: string;
  date: string;
  rating: number;
  review: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  responded: boolean;
  profile_url?: string;
  photo?: string;
}

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<null | Review>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar reseñas desde Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('reseñas_actuales')
          .select('*')
          .order('fecha', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Transformar los datos para que coincidan con la interfaz Review
        const formattedReviews = data.map((item, index) => ({
          id: index + 1,
          UUID: item.UUID || '',
          customer: item.nombre || 'Cliente anónimo',
          date: formatDate(item.fecha),
          rating: item.puntuacion || 0,
          review: item.reseña || '',
          sentiment: determineSentiment(item.puntuacion || 0),
          responded: false, // Podríamos tener una columna para esto en el futuro
          profile_url: item.url_perfil || '',
          photo: item.foto_autor || '',
        }));
        
        setReviews(formattedReviews);
      } catch (err) {
        console.error('Error al cargar reseñas:', err);
        setError('No se pudieron cargar las reseñas. Por favor, inténtelo de nuevo.');
        toast.error('Error al cargar reseñas');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  // Función para formatear fechas
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Fecha desconocida';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };

  // Función para determinar el sentimiento basado en la puntuación
  const determineSentiment = (rating: number): 'positive' | 'neutral' | 'negative' => {
    if (rating >= 4) return 'positive';
    if (rating >= 3) return 'neutral';
    return 'negative';
  };

  // Filter reviews based on search query and filters
  const filteredReviews = reviews.filter(review => {
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

  // Function to handle opening the response dialog
  const handleOpenResponseDialog = (review: Review) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  // Function to handle responding to a review
  const handleRespond = (id: number, response: string) => {
    // En el futuro, aquí podríamos guardar la respuesta en Supabase
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, responded: true } : review
    ));
  };

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
          
          {/* Estado de carga o error */}
          {isLoading && (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#02B1C4]" />
              <span className="ml-3 text-[#2F2F4C]">Cargando reseñas...</span>
            </div>
          )}
          
          {error && (
            <Card className="mb-6">
              <CardContent className="p-6 text-center text-red-500">
                {error}
                <Button 
                  className="mt-4" 
                  onClick={() => window.location.reload()}
                >
                  Reintentar
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Reviews display */}
          {!isLoading && !error && (
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
                      {filteredReviews.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No se encontraron reseñas que coincidan con los filtros aplicados
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredReviews.map((review) => (
                          <TableRow key={review.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {review.photo && (
                                  <img 
                                    src={review.photo} 
                                    alt={review.customer} 
                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                  />
                                )}
                                {review.customer}
                              </div>
                            </TableCell>
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
                                onClick={() => handleOpenResponseDialog(review)}
                              >
                                <MessageCircle size={14} />
                                {review.responded ? "Respondida" : "Responder"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="cards">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredReviews.length === 0 ? (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No se encontraron reseñas que coincidan con los filtros aplicados
                    </div>
                  ) : (
                    filteredReviews.map((review) => (
                      <Card key={review.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center">
                                {review.photo && (
                                  <img 
                                    src={review.photo} 
                                    alt={review.customer} 
                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                  />
                                )}
                                <h3 className="font-medium text-[#2F2F4C]">{review.customer}</h3>
                              </div>
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
                              onClick={() => handleOpenResponseDialog(review)}
                            >
                              <MessageCircle size={14} />
                              {review.responded ? "Respondida" : "Responder"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Response Dialog */}
          <ReviewResponseDialog 
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            review={selectedReview}
            onRespond={handleRespond}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
