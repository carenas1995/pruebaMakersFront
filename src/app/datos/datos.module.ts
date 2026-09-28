import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginUseCase } from '../dominio/caso-uso/auth/LoginUseCase';
import { CambiarEstadoPrestamoUseCase } from '../dominio/caso-uso/prestamos/CambiarEstadoPrestamoUseCase';
import { AuthRepository } from '../dominio/repositorios/AuthRepository';
import { PrestamoRepository } from '../dominio/repositorios/PrestamosRepository';
import { AuthService } from './http-servicios/auth.service';
import { PrestamosService } from './http-servicios/prestamos.service';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { SolicitarPrestamoUseCase } from '../dominio/caso-uso/prestamos/SolicitarPrestamoUseCase';

export const loginUseCaseProvider = {
  provide: LoginUseCase,
  useFactory: (repo: AuthRepository) => new LoginUseCase(repo),
  deps: [AuthRepository]
};

export const solicitarPrestamoUseCaseProvider = {
  provide: SolicitarPrestamoUseCase,
  useFactory: (repo: PrestamoRepository) => new SolicitarPrestamoUseCase(repo),
  deps: [PrestamoRepository]
};

export const cambiarEstadoPrestamoUseCaseProvider = {
  provide: CambiarEstadoPrestamoUseCase,
  useFactory: (repo: PrestamoRepository) => new CambiarEstadoPrestamoUseCase(repo),
  deps: [PrestamoRepository]
};

//#endregion

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: AuthRepository, useClass: AuthService },
    { provide: PrestamoRepository, useClass: PrestamosService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    loginUseCaseProvider,
    solicitarPrestamoUseCaseProvider,
    cambiarEstadoPrestamoUseCaseProvider
  ]
})
export class DatosModule { }