import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthRepository } from '../../dominio/repositorios/AuthRepository';
import { UsuarioSesion, LoginRequestDTO, LoginResponseDTO } from '../../dominio/interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthRepository {
  private readonly apiUrl = `${environment.urlWebApi}/auth`;
  private sesionSubject = new BehaviorSubject<UsuarioSesion | null>(this.obtenerSesionGuardada());

  constructor(private http: HttpClient,
    private router: Router) { }

  login(credentials: LoginRequestDTO): Observable<UsuarioSesion> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/login`, credentials).pipe(
      map(res => ({
        token: res.token,
        email: res.email,
        rol: res.rol ?? (res as any).role
      })),
      tap(sesion => {
        localStorage.setItem('user_session', JSON.stringify(sesion));
        this.sesionSubject.next(sesion);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user_session');
    this.sesionSubject.next(null);
    this.router.navigate(['/login']);
    window.location.reload();
  }

  obtenerSesionActual(): UsuarioSesion | null {
    return this.sesionSubject.value;
  }

  private obtenerSesionGuardada(): UsuarioSesion | null {
    const raw = localStorage.getItem('user_session');
    return raw ? JSON.parse(raw) : null;
  }
}