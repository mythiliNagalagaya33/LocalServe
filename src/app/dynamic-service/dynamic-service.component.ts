import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';


interface Provider {
  provider_id: string;
  provider_name: string;
  email: string;
  phone_number: string;
  address: string;
  status: string;
  isBooked?: boolean; // New field to track booking status

}

interface Service {
  service_name: string;
  description: string;
  pricing: number | null;
  image_url: string;
  providers: Provider[];
  service_id: string;
}

@Component({
  selector: 'app-dynamic-service',
  templateUrl: './dynamic-service.component.html',
  styleUrls: ['./dynamic-service.component.css']
})
export class DynamicServiceComponent implements OnInit {
  service: Service | null = null;
  bookedProviders: { [key: string]: boolean } = {}; 
  

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router,private bookingService: BookingService) {}

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('service_id');
    this.getServiceDetails(serviceId);
  }

  getServiceDetails(serviceId: string | null) {
    this.http.get<Service>(`http://localhost:5000/localservices/${serviceId}/providers`).subscribe(data => {
      console.log(data);
      this.service = {
        service_name: data.service_name,
        description: data.description,
        pricing: data.pricing,
        image_url: data.image_url,
        providers: data.providers,
        service_id: data.service_id
      };
      console.log(data.providers);
    }, error => {
      console.error('Error fetching service details:', error);
    });
  }



  bookProvider(Provider: any, Service: any) {
    console.log(Provider)
    console.log(Service)
    this.bookingService.provider = Provider;
    this.bookingService.service = Service;
    // Navigate to the user booking component with providerId and listingId as route parameters
    this.router.navigate(['user/bookings', Service.service_id, Provider.provider_id]);  
  }
}
    
    // }


  // // Method to handle booking of a service provider
  // bookNow(provider: Provider) {
  //   // Alert the user that the service is booked
  //   alert('Your service is booked with ' + provider.provider_name + '!');

  //   // Mark this provider as booked
  //   this.bookedProviders[provider.provider_id] = true;
  //   provider.isBooked = true;

    // Optional: Perform additional logic here (e.g., store booking in backend)
    // You can send the booking information to your backend API if needed
    // this.http.post('http://localhost:5000/bookings', { providerId: provider.provider_id })
    //   .subscribe(response => {
    //     console.log('Booking successful:', response);
    //   }, error => {
    //     console.error('Error during booking:', error);
    //   });
  

  // Method to check if a provider is booked
  // isProviderBooked(providerId: string): boolean {
  //   return !!this.bookedProviders[providerId];
  // }


