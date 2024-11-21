import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
// import { AuthService } from './auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false; 
    }
  }
}
