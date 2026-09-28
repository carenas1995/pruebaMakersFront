import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../repositorios/AuthRepository';
import { UseCase } from '../../base/usecase';
import { LoginRequestDTO, UsuarioSesion } from '../../interface/auth.interface';

@Injectable({ providedIn: 'root' })
export class LoginUseCase implements UseCase<{credentials:LoginRequestDTO}, UsuarioSesion> {
  constructor(private authRepository: AuthRepository) {}

  execute(params:{credentials: LoginRequestDTO}): Observable<UsuarioSesion> {
    return this.authRepository.login(params.credentials);
  }
}