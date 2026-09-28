import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const rawSession = localStorage.getItem('user_session');
        let token = null;

        if (rawSession) {
            const sesion = JSON.parse(rawSession);
            token = sesion.token;
        }

        let authReq = request;
        if (token) {
            authReq = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    localStorage.removeItem('user_session');
                    this.router.navigate(['/login']);
                }
                else if (error.status === 403) {
                    localStorage.removeItem('user_session');
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}