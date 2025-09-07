import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (token.hayToken()) {
    return true;
  }
  router.navigate(["/inicio-sesion"]);
  return false;
};
