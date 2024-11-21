import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
@Injectable({
  providedIn: 'root'
})
export class FeedbackEventService {
  private feedbackEvent = new BehaviorSubject<boolean>(false);
  showModal=false

  // Observable to subscribe to
  feedbackEvent$ = this.feedbackEvent.asObservable();

  // Method to trigger the event
  triggerFeedbackEvent(value:boolean) {
    console.log('int feedback servcie trigger event', value)
    this.showModal=value;
    this.feedbackEvent.next(value);
    // UserdashboardComponent.openFeedbackForm()
  }

}
