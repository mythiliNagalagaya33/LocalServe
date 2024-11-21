import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Service {
  service_name: string;
  image_url: string; 
  service_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService  {

  constructor(private http: HttpClient) { }

  booking(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/user/booking', data);
  }


  getUser():Observable<any>{
    return this.http.get('http://localhost:5000/user/getUser')
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`http://localhost:5000/user/updateUser`, userData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('http://localhost:5000/localservices');
  }

  getNotifications():Observable<any>{
    return this.http.get('http://localhost:5000/user/getNotifications')
  }
  markAllNotificationsAsRead(): Observable<any> {
    return this.http.post('http://localhost:5000/user/markAllNotificationsAsRead', null);
}

  getCities(): Observable<any> {
    return this.http.get(`http://localhost:5000/cities`);
  }


}

