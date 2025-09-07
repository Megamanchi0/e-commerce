import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const noLoggedGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService);
    const router = inject(Router);
  
    if (token.hayToken()) {
      router.navigate(["/"]);
      return false;
    }
    return true;
};
