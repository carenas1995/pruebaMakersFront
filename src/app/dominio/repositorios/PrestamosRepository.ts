import { Observable } from 'rxjs';
import { Prestamo } from '../interface/prestamo.interface';

export abstract class PrestamoRepository {
  abstract solicitarPrestamo(prestamo: Prestamo): Observable<Prestamo>;
  abstract obtenerMisPrestamos(): Observable<Prestamo[]>;
  abstract obtenerTodosLosPrestamos(): Observable<Prestamo[]>;
  abstract cambiarEstadoPrestamo(id: number, estado: 'APROBADO' | 'RECHAZADO'): Observable<Prestamo>;
}