import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { Prestamo } from '../../interface/prestamo.interface';
import { PrestamoRepository } from '../../repositorios/PrestamosRepository';

@Injectable({ providedIn: 'root' })
export class CambiarEstadoPrestamoUseCase implements UseCase<{id: number, estado: 'APROBADO' | 'RECHAZADO'}, Prestamo> {
  constructor(private prestamoRepository: PrestamoRepository) {}

  execute(params:{id: number, estado: 'APROBADO' | 'RECHAZADO'}): Observable<Prestamo> {
    return this.prestamoRepository.cambiarEstadoPrestamo(params.id, params.estado);
  }
}