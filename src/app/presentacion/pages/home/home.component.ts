import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../datos/http-servicios/auth.service';
import { CambiarEstadoPrestamoUseCase } from '../../../dominio/caso-uso/prestamos/CambiarEstadoPrestamoUseCase';
import { SolicitarPrestamoUseCase } from '../../../dominio/caso-uso/prestamos/SolicitarPrestamoUseCase';
import { UsuarioSesion } from '../../../dominio/interface/auth.interface';
import { Prestamo } from '../../../dominio/interface/prestamo.interface';
import { PrestamoRepository } from '../../../dominio/repositorios/PrestamosRepository';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  sesionActual: UsuarioSesion | null = null;
  prestamos: Prestamo[] = [];
  prestamoForm: FormGroup;
  cargando = false;
  errorMensaje = '';

  constructor(
    private authService: AuthService,
    private prestamoRepository: PrestamoRepository,
    private solicitarPrestamoUseCase: SolicitarPrestamoUseCase,
    private cambiarEstadoPrestamoUseCase: CambiarEstadoPrestamoUseCase,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.prestamoForm = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.sesionActual = this.authService.obtenerSesionActual();
    if (!this.sesionActual) {
      this.router.navigate(['/login']);
      return;
    }
    this.obtenerPrestamos();
  }

  obtenerPrestamos(): void {
    this.cargando = true;
    const request$ = this.esAdmin
      ? this.prestamoRepository.obtenerTodosLosPrestamos()
      : this.prestamoRepository.obtenerMisPrestamos();

    request$.subscribe({
      next: (data) => {
        this.prestamos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'Error al cargar los préstamos';
        this.cargando = false;
      }
    });
  }

  solicitar(): void {
    if (this.prestamoForm.invalid) return;

    this.cargando = true;
    const nuevoPrestamo: Prestamo = {
      monto: Number(this.prestamoForm.value.monto)
    };

    this.solicitarPrestamoUseCase.execute({ prestamo: nuevoPrestamo }).subscribe({
      next: () => {
        this.prestamoForm.reset();
        this.obtenerPrestamos();
      },
      error: () => {
        this.errorMensaje = 'No se pudo registrar la solicitud';
        this.cargando = false;
      }
    });
  }

  cambiarEstado(id: number | undefined, estado: 'APROBADO' | 'RECHAZADO'): void {
    if (!id) return;

    this.cargando = true;
    this.cambiarEstadoPrestamoUseCase.execute({ id: id, estado: estado }).subscribe({
      next: () => this.obtenerPrestamos(),
      error: () => {
        this.errorMensaje = 'Error al cambiar el estado del préstamo';
        this.cargando = false;
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get esAdmin(): boolean {
    return this.sesionActual?.rol === 'ADMIN';
  }
}