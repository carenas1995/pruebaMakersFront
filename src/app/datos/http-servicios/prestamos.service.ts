import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prestamo, PrestamoRequestDTO, PrestamoResponseDTO } from '../../dominio/interface/prestamo.interface';
import { PrestamoRepository } from '../../dominio/repositorios/PrestamosRepository';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService implements PrestamoRepository {
  private readonly apiUrl = `${environment.urlWebApi}/prestamos`;

  constructor(private http: HttpClient) { }

  solicitarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    const payload: PrestamoRequestDTO = {
      amount: prestamo.monto || 0,
      termMonths: prestamo.plazoMeses || 12
    };

    return this.http.post<PrestamoResponseDTO>(this.apiUrl, payload).pipe(
      map(res => this.mapToDomain(res))
    );
  }

  obtenerMisPrestamos(): Observable<Prestamo[]> {
    return this.http.get<PrestamoResponseDTO[]>(`${this.apiUrl}/misprestamos`).pipe(
      map(items => items.map(item => this.mapToDomain(item)))
    );
  }

  obtenerTodosLosPrestamos(): Observable<Prestamo[]> {
    return this.http.get<PrestamoResponseDTO[]>(this.apiUrl).pipe(
      map(items => items.map(item => this.mapToDomain(item)))
    );
  }

  cambiarEstadoPrestamo(id: number, estado: 'APROBADO' | 'RECHAZADO'): Observable<Prestamo> {
    const endpoint = estado === 'APROBADO' ? 'aprobado' : 'rechazado';

    return this.http.put<PrestamoResponseDTO>(`${this.apiUrl}/${id}/${endpoint}`, {}).pipe(
      map(res => this.mapToDomain(res))
    );
  }

  private mapToDomain(dto: PrestamoResponseDTO): Prestamo {
    return {
      id: dto.id,
      usuarioEmail: dto.username,
      monto: dto.monto,
      plazoMeses: dto.termMonths,
      estado: dto.status,
      fechaCreacion: dto.createdAt ? new Date(dto.createdAt) : undefined
    };
  }
}