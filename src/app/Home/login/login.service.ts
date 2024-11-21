import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router

export interface LoginResponse {
    roles: any;
    message: string;
    role?: string;
    token: string;
    status?: string; // Optional property for tracking status
}

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private loginUrl = 'http://127.0.0.1:5000/user/login'; // Adjust with your API endpoint

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.loginUrl, { email, password })
            // .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unexpected error occurred.';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message; // Client-side error
        } else {
            errorMessage = error.error.message || 'Server error'; // Server-side error
        }
        return throwError(errorMessage);
    }
}
