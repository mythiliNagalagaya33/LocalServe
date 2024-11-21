import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { FeedbackEventService } from 'src/app/feedback-event.service';

@Component({
  selector: 'app-provider-booking',
  templateUrl: './provider-booking.component.html',
  styleUrl: './provider-booking.component.css'
})
export class ProviderBookingComponent implements OnInit{
  pendingRequests: any[] = [];
  confirmedBookings: any; // Define the confirmed bookings property
  bookingHistory: any[] = []; // Array for completed bookings (history)
  userDetails: { [key: string]: any } = {}; // Store user details keyed by user ID
  activeTab: string = 'pending'; // Set the default active tab



  constructor(private bookingService: BookingService,private feedbackEventService: FeedbackEventService) {}


  ngOnInit(): void {
    this.loadPendingRequests();
    this.loadConfirmedBookings();
    this.loadBookingHistory();


  }
  loadPendingRequests() {
    this.bookingService.getPendingBookings().subscribe(
      (data) => {
        this.pendingRequests = data;
        console.log('Pending Requests:', this.pendingRequests);
      },
      (error) => {
        console.error('Error fetching pending requests', error);
      }
    );
  }

  loadConfirmedBookings() {
    this.bookingService.getConfirmedBookings().subscribe(
      (data) => {
        this.confirmedBookings = data.confirmed_bookings; // Assign fetched confirmed bookings
        console.log('Confirmed Bookings:', this.confirmedBookings);
      },
      (error) => {
        console.error('Error fetching confirmed bookings', error);
      }
    );
  }


  loadBookingHistory() {
    this.bookingService.getBookingHistory().subscribe(
      (data) => {
        this.bookingHistory = data.completed_bookings;
        console.log('Booking History:', this.bookingHistory);
      },
      (error) => {
        console.error('Error fetching booking history', error);
      }
    );
  }


  loadUserDetails() {
    // Fetch user details for each pending request
    const userIds = this.pendingRequests.map(request => request.user_id);

    userIds.forEach(userId => {
      this.bookingService.getUser().subscribe(
        (userData) => {
          this.userDetails[userId] = userData; // Store user details keyed by user ID
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );
    });
  }

  showTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'confirmed') {
      this.loadConfirmedBookings();
    } else if (tab === 'history') {
      this.loadBookingHistory(); // Load history when the tab is switched to history
    }
  }
  acceptRequest(bookingId: string) {
    this.bookingService.updateBookingStatus(bookingId, 'confirmed').subscribe(
      (response) => {
        console.log('Accepted request with ID: ${bookingId}');
        this.loadPendingRequests();
        this.loadConfirmedBookings(); // Reload confirmed bookings after acceptance

      },
      (error) => {
        console.error('Error updating booking status:', error);
      }
      
    )
    
    console.log(`Accepted request with ID: ${bookingId}`);
  }

  rejectRequest(bookingId: string) {
    this.bookingService.updateBookingStatus(bookingId, 'cancelled').subscribe(
      (response) => {
        console.log('Rejected request with ID: ${bookingId}');
        this.loadPendingRequests();
      },
      (error) => {
        console.error('Error updating booking status:', error);
      }
    )
    console.log(`Rejected request with ID: ${bookingId}`);
  }
  completed(bookingId: string) {
    this.bookingService.updateBookingStatus(bookingId, 'completed').subscribe(
      (response) => {
        console.log(`Booking with ID ${bookingId} marked as completed`);
        this.loadConfirmedBookings(); // Reload confirmed bookings
        this.loadBookingHistory(); // Reload booking history to show the completed booking
        console.log('provider triggering feedback event');
        this.feedbackEventService.triggerFeedbackEvent(true);
      },
      (error) => {
        console.error('Error updating booking status:', error);
      }
    );
  } 
}
