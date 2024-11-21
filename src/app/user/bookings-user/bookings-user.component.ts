import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { CommonModule } from '@angular/common';

interface Booking {
  service: {
    service_name: string;
  };
  availability: {
    provider: {
      provider_name: string;
    };
  };
  booking_date: string; // or Date if you parse it into a Date object
  status: 'pending' | 'confirmed' | 'rejected' | 'completed'; // Define possible statuses
}

@Component({
  selector: 'app-bookings-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings-user.component.html',
  styleUrls: ['./bookings-user.component.css']
})
export class BookingsUserComponent implements OnInit {
  bookings: Booking[] = [];
  pendingRequests: Booking[] = [];
  confirmedBookings: Booking[] = [];
  rejectedBookings: Booking[] = [];
  completedBookings: Booking[] = [];
  activeTab: string = 'pending';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingService.getUserBookings().subscribe(
      (data: Booking[]) => {
        this.bookings = data;
        console.log(data);

        // Categorize bookings based on their status
        this.pendingRequests = this.bookings.filter(booking => booking.status === 'pending');
        this.confirmedBookings = this.bookings.filter(booking => booking.status === 'confirmed');
        this.rejectedBookings = this.bookings.filter(booking => booking.status === 'rejected');
        this.completedBookings = this.bookings.filter(booking => booking.status === 'completed');
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  showTab(tab: string): void {
    this.activeTab = tab;
  }
}
