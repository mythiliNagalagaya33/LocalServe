import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken() && authService.isAdminLoggedin() ){
    return true; 
  } 
  else {
    router.navigate(['/login']); 
    return false;
  }
};