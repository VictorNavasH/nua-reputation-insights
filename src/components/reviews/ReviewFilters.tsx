
import React from 'react';
import { Search, Calendar, Star, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ReviewFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  ratingFilter: string;
  setRatingFilter: (filter: string) => void;
  viewType: 'table' | 'cards';
  setViewType: (type: 'table' | 'cards') => void;
}

const ReviewFilters = ({
  searchQuery,
  setSearchQuery,
  dateFilter,
  setDateFilter,
  ratingFilter,
  setRatingFilter,
  viewType,
  setViewType
}: ReviewFiltersProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm mb-6">
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
              <SelectItem value="week">Últimos 7 días</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Últimos 3 meses</SelectItem>
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
            <div className="w-full bg-muted p-1 rounded-md h-10 flex items-center justify-center">
              <Button 
                variant={viewType === 'table' ? "default" : "ghost"}
                size="sm"
                className="w-1/2 h-8 rounded-sm flex items-center justify-center gap-1"
                onClick={() => setViewType('table')}
              >
                <TableIcon size={14} />
                <span>Tabla</span>
              </Button>
              <Button 
                variant={viewType === 'cards' ? "default" : "ghost"}
                size="sm"
                className="w-1/2 h-8 rounded-sm flex items-center justify-center gap-1"
                onClick={() => setViewType('cards')}
              >
                <LayoutGrid size={14} />
                <span>Tarjetas</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ReviewFilters;
