import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://127.0.0.1:5000/reviews/add-review'; // Update with your API URL

  constructor(private http: HttpClient) {}


  addReview(reviewData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reviewData);
  }
}
