import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProviderService implements OnInit {



  provider:any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }


  getProvider(): Observable<any> {
    return this.http.get('http://localhost:5000/provider/getProvider');
  }

  updateProvider(providerId: string, providerData: any): Observable<any> {
    return this.http.put('http://localhost:5000/provider/updateProvider', providerData, {observe : 'response'} );
  }

  getServices(): Observable<any> {
    return this.http.get(`http://localhost:5000/localservices`);
  }

  getCities(): Observable<any> {
    return this.http.get(`http://localhost:5000/cities`);
  }

  getNotifications():Observable<any>{
    return this.http.get('http://localhost:5000/provider/getNotifications')
  }

  markAllNotificationsAsRead(): Observable<any> {
    return this.http.post('http://localhost:5000/provider/markAllNotificationsAsRead', null);
}
}
