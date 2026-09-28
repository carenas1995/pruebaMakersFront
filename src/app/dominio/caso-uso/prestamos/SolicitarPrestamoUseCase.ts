import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { Prestamo } from '../../interface/prestamo.interface';
import { PrestamoRepository } from '../../repositorios/PrestamosRepository';

@Injectable({ providedIn: 'root' })
export class SolicitarPrestamoUseCase implements UseCase<{prestamo:Prestamo}, Prestamo> {
  constructor(private prestamoRepository: PrestamoRepository) {}

  execute(params:{prestamo: Prestamo}): Observable<Prestamo> {
    return this.prestamoRepository.solicitarPrestamo(params.prestamo);
  }
}