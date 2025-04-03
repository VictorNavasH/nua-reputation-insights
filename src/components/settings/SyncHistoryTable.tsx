
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Definimos una interfaz para los logs de sincronización
export interface SyncLog {
  id: string;
  fecha: string;
  nuevas: number;
  duplicadas: number;
  estado: 'ok' | 'error' | 'sin datos';
  mensaje?: string;
  source?: string;
}

// Datos de ejemplo para la vista previa
const demoSyncLogs: SyncLog[] = [
  {
    id: '1',
    fecha: new Date(2024, 3, 1, 14, 23).toISOString(),
    nuevas: 12,
    duplicadas: 3,
    estado: 'ok',
    source: 'Google Reviews'
  },
  {
    id: '2',
    fecha: new Date(2024, 3, 1, 10, 15).toISOString(),
    nuevas: 0,
    duplicadas: 0,
    estado: 'sin datos',
    mensaje: 'No se encontraron nuevas reseñas para sincronizar',
    source: 'TripAdvisor'
  },
  {
    id: '3',
    fecha: new Date(2024, 2, 28, 19, 45).toISOString(),
    nuevas: 0,
    duplicadas: 0,
    estado: 'error',
    mensaje: 'Error de autenticación: API key inválida',
    source: 'Yelp'
  },
  {
    id: '4',
    fecha: new Date(2024, 2, 25, 9, 30).toISOString(),
    nuevas: 8,
    duplicadas: 1,
    estado: 'ok',
    source: 'Google Reviews'
  }
];

interface SyncHistoryTableProps {
  logs?: SyncLog[];
  limit?: number;
}

const SyncHistoryTable: React.FC<SyncHistoryTableProps> = ({ 
  logs = demoSyncLogs,
  limit = 10
}) => {
  // Limitar el número de registros según el parámetro limit
  const displayLogs = logs.slice(0, limit);
  
  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: es });
    } catch (e) {
      return dateString;
    }
  };

  // Renderizar un badge según el estado
  const renderStatusBadge = (estado: SyncLog['estado']) => {
    switch (estado) {
      case 'ok':
        return <Badge className="bg-green-500 hover:bg-green-600">Completado</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'sin datos':
        return <Badge variant="secondary">Sin datos</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Fuente</TableHead>
            <TableHead className="text-center">Nuevas</TableHead>
            <TableHead className="text-center">Duplicadas</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Mensaje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayLogs.length > 0 ? (
            displayLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">
                  {formatDate(log.fecha)}
                </TableCell>
                <TableCell>{log.source || 'Desconocido'}</TableCell>
                <TableCell className="text-center">{log.nuevas}</TableCell>
                <TableCell className="text-center">{log.duplicadas}</TableCell>
                <TableCell>{renderStatusBadge(log.estado)}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {log.mensaje || (log.estado === 'ok' ? 'Sincronización completada correctamente' : '')}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No hay registros de sincronización disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SyncHistoryTable;
