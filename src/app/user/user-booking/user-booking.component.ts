import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/booking.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private location: Location) { }
  availability: any[] = [];
  provider:any
  service:any
  availableDates: any[] = []; 
  today:any
  reviews: any[] = [];
  averageRating: number = 0;
  selectedDate: string | null = null; // To store the user's selected date
  ngOnInit(): void {
    console.log('Provider Data123:', this.provider); // Log to check the provider object
  
    // Fetch service data
    this.service = this.bookingService.service;
  
    let date = new Date();
    this.today = date.toISOString().split('T')[0];  // Get today's date in 'YYYY-MM-DD' format
  
    // Fetch available dates and provider details
    this.bookingService.getProviderAvailabilities(this.bookingService.provider.provider_id).subscribe((data) => {
      this.availableDates = data.availability;  // Get the availability array
      console.log('Available Dates:', this.availableDates);
  
      if (this.availableDates && this.availableDates.length > 0) {
        this.provider = this.availableDates[0].provider; // Assuming provider is the same for all available dates, get it from the first item
      }
  
      this.reviews = data.Reviews;  // Reviews from response
      this.calculateAverageRating();
  
      // Log the entire data to check its structure
      console.log(data);
    });
  }

  calculateAverageRating(): void {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating.rating_value, 0);
    this.averageRating = totalRating / this.reviews.length;
  }

  getStars(rating: number): number[] {
    // Get the full stars and empty stars based on the rating
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? 1 : 0);
    }
    return stars;
  }
  
  
  
    onDateChange(event: Event): void {
      const target = event.target as HTMLInputElement; // Type assertion
      this.selectedDate = target.value; // Now TypeScript recognizes target as HTMLInputElement
    }
    submitBooking() {
      if (!this.selectedDate) {
        Swal.fire({
          title: 'Date Not Selected',
          text: 'Please select a date for the booking.',
          icon: 'warning',
          confirmButtonText: 'Okay'
        });        return;
      }

      if (!this.isAvailable(this.selectedDate)) {
        Swal.fire({
          title: 'Date Unavailable',
          text: 'The selected date is not available. Please choose from the available dates.',
          icon: 'warning',
          customClass: {
            popup: 'swal-custom-height'
          },
          width: '30%', 
          // height: '30%',
          confirmButtonText: 'Okay'
        });
        return;
  }

    const bookingData = {
      provider_id: this.provider.provider_id,
      service_id: this.service.service_id,
      date: this.selectedDate
    };

    this.bookingService.createBooking(bookingData).subscribe((data) => {
      console.log(data);
      // alert('Booking created successfully');
      // alert(data.message);
      Swal.fire({
        title: 'Booking Request Sent!',
        text: 'Your request has been sent to the provider. Please wait for acceptance.',
        icon: 'success',
        confirmButtonText: 'Go to Services'
      }).then((result) => {

        if (result.isConfirmed) {
          this.location.back();
        }
      });
    })
}
selectDate(date: string): void {
  this.selectedDate = date; // Update selectedDate when the button is clicked
}

isAvailable(date: string): boolean {
  return this.availableDates.some(availableDate => availableDate.date === date); // Check if the date exists in availableDates
}


  // isAvailable(date: string): boolean {
  //   return this.availableDates.includes(date); // Check if the date exists in the availableDates array
  // }
}