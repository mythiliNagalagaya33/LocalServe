import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/admin'; // Change this to your API base URL

  constructor(private http: HttpClient) {}

  getUsersList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/userslist`);
  }

  getProvidersList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/providerlist`);
  }

  getPendingProviders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending-providers`);
  }

  // Method to approve a provider
  approveProvider(providerId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-provider/${providerId}`, { action: 'approve' });
  }

  // Method to reject a provider
  rejectProvider(providerId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-provider/${providerId}`, { action: 'reject' });
  }

  toggleUserStatus(userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/toggle-user-status/${userId}`, {});
  }

  toggleProviderStatus(providerId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/toggle-provider-status/${providerId}`, {});
  }
}
