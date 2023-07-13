import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (_, __) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.user()) {
    return true;
  }

  router.navigate(['/auth']);
  return false;
};

export const isLoggedGuard: CanActivateFn = (_, __) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.user()) {
    router.navigate(['']);
    return false;
  }

  return true;
}