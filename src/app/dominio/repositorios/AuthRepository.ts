import { Observable } from 'rxjs';
import { LoginRequestDTO, UsuarioSesion } from '../interface/auth.interface';

export abstract class AuthRepository {
  abstract login(credentials: LoginRequestDTO): Observable<UsuarioSesion>;
  abstract logout(): void;
  abstract obtenerSesionActual(): UsuarioSesion | null;
}