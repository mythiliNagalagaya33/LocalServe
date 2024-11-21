import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:5000'; 

  provider:any=[]
  service:any

  constructor(private http: HttpClient) {}

  getProviderAvailabilities(providerId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/provider/${providerId}/availabilities`);
  }

  // Create a new booking
  createBooking(bookingData: any): Observable<any> {
    console.log(bookingData)
    return this.http.post<any>(`${this.baseUrl}/bookings`, bookingData);
  }

  // Get user bookings
  getUserBookings(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/my_bookings`);
  }

// Get pending bookings of proider
  getPendingBookings(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/provider/pending_bookings');
  }

  getConfirmedBookings(): Observable<any> { // Add this method
    return this.http.get<any>(`${this.baseUrl}/provider/confirmed_bookings`); // Ensure this URL matches your backend endpoint
  }

  getBookingHistory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/provider/completed_bookings`);
  }

    // Update the booking status (accept or reject)
    updateBookingStatus(bookingId: string, status: string): Observable<any> {
      return this.http.patch(`${this.baseUrl}/bookings/update_booking_status/${bookingId}`, { status });
    }

  getUser():Observable<any>{
    return this.http.get('http://localhost:5000/user/getUser')
  }
  
  
}
