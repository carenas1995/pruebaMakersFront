import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";


export const authorizateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const rawSession = localStorage.getItem('user_session');

  if (!rawSession) {
    router.navigate(['/login']);
    return false;
  }

  const sesion = JSON.parse(rawSession);
  const requiredRole = route.data?.['rol'];

  if (requiredRole && sesion.rol !== requiredRole) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};