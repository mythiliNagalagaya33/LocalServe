import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import this for error handling
import { FeedbackEventService } from 'src/app/feedback-event.service'; // Import the FeedbackEventService
// import * as bootstrap from 'bootstrap';
interface Service {
  service_name: string;
  image_url: string;
  service_id: string;
}

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit{
  services: Service[] = [];
  currentIndex: number = 0;
  itemsPerPage: number = 4; 
  showFeedbackForm: boolean = false;  // To control modal visibility
  feedback = { rating: 0, comments: '' };  
  @ViewChild('sliderContainer', { static: true }) sliderContainer!: ElementRef;
  constructor(private userService: UserServiceService, public feedbackEventService: FeedbackEventService) { }
  

  ngOnInit(): void {
    this.loadServices();
    this.feedbackEventService.feedbackEvent$.subscribe(value => {
      console.log('subscribed to feedback event:', value);
      this.showFeedbackForm = true;
      
  });
  }

  loadServices(): void {
    this.userService.getServices().subscribe(
      (data) => {
        this.services = data.slice(0, 10); // Limit to 4 services
        console.log('Services loaded:', this.services);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  scrollLeft(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage; // Decrease index by items per page
    }
  }

  scrollRight(): void {
    if (this.currentIndex + this.itemsPerPage < this.services.length) {
      this.currentIndex += this.itemsPerPage; // Increase index by items per page
    }
  }

  getVisibleServices(): any[] {
    return this.services.slice(this.currentIndex, this.currentIndex + this.itemsPerPage); // Get current page services
  }
  openFeedbackForm() {
    this.showFeedbackForm = true;
  }

  closeFeedbackForm() {
    this.showFeedbackForm = false;
  }

  rateExperience(rating: number) {
    this.feedback.rating = rating;
  }

  submitFeedback() {
    console.log('Feedback submitted:', this.feedback);
    this.closeFeedbackForm();
  }
  servicesCompleted() {
    this.feedbackEventService.triggerFeedbackEvent(true);
  }
}