import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-availability',
  templateUrl: './add-availability.component.html',
  styleUrl: './add-availability.component.css'
})
export class AddAvailabilityComponent {



  minDate!: string;
  maxDate!: string;
  providerId: string = 'PROVIDER_ID_HERE'; // Replace with actual provider ID or fetch from user session
  availability = {
    date: '',
    provider_id: this.providerId,
    status: 'available'  // Default status
  };
  availabilities: any[] = []; // Array to hold fetched availabilities

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.setDateRange(); 
    // Get today's date
    const today = new Date();
    this.minDate = this.formatDate(today);

    // Calculate date 7 days from today
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);
    this.maxDate = this.formatDate(maxDate);

    this.fetchAvailabilities(); // Fetch availabilities on component initialization
    setInterval(() => {
      this.setDateRange();
    }, 86400000); // Update date range every 24 hours
  }

  // Helper function to format the date as 'yyyy-mm-dd'
  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
   // Set min and max dates based on today's date
   setDateRange(): void {
    const today = new Date();
    this.minDate = this.formatDate(today);

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7); // Set max date to 7 days from today
    this.maxDate = this.formatDate(maxDate);

    // Filter out any availabilities outside the current date range
    this.filterOutdatedAvailabilities();
  }

  // Submit function to add availability
  onSubmit(): void {
    this.availability.provider_id = this.providerId;

    this.http.post<any>('http://127.0.0.1:5000/availability/addavailability', this.availability)
    .subscribe(
        (response: any) => {
          console.log('Availability added successfully', response);
          alert('Availability added successfully');

          this.availabilities.push(response); // Add the new availability to the availabilities array
          // this.fetchAvailabilities(); // Fetch availabilities on component initialization


          // Navigate to another page or show success message
        },
        (error: any) => {
          console.error('Error adding availability', error);
          alert(error.error.message);
        }
      );

  }
  filterOutdatedAvailabilities(): void {
    const minDateObj = new Date(this.minDate);
    const maxDateObj = new Date(this.maxDate);

    this.availabilities = this.availabilities.filter(availability => {
      const availabilityDate = new Date(availability.date);
      return availabilityDate >= minDateObj && availabilityDate <= maxDateObj;
    });
  }
  fetchAvailabilities(): void {
    this.http.get<any>('http://127.0.0.1:5000/availability/myavailabilities') // Update this endpoint as necessary
      .subscribe(
        (response: any) => {
          this.availabilities = response; // Assuming the response is an array of availabilities
          console.log('Fetched availabilities:', this.availabilities);
        },
        (error: any) => {
          console.error('Error fetching availabilities', error);
        }
      );
  }
  deleteAvailability(availabilityId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this availability?');
    if (confirmDelete) {
        this.http.delete(`http://127.0.0.1:5000/availability/deleteavailability/${availabilityId}`)
        .subscribe(
            response => {
                console.log('Availability deleted successfully', response);
                // Optionally, refresh the availabilities list after deletion
                this.availabilities = this.availabilities.filter(a => a.id !== availabilityId);
                this.fetchAvailabilities();

            },
            error => {
                console.error('Error deleting availability', error);
                alert('Error deleting availability');
            }
        );
    }
}
}


