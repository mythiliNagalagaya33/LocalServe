import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  setToken(token: string) {
    console.log(token);
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }
  isUserLoggedin() {
    const role=localStorage.getItem('role');
    return role == 'user'
  }

  isProviderLoggedin() {
    const role=localStorage.getItem('role');
    return role == 'provider'
  }
  isAdminLoggedin() {
    const role=localStorage.getItem('role');
    return role == 'admin'
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login']); 
  }
  
}
