import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/provider/provider.service';

@Component({
  selector: 'app-provider-signup',
  templateUrl: './providersignup.component.html',
  styleUrls: ['./providersignup.component.css']
})
export class ProviderSignupComponent implements OnInit {
  registrationForm: FormGroup;
  passwordMismatch: boolean = false;
  message: string = '';
  services: any[] = [];
  selectedServiceIds: string[] = [];
  showAddServiceDropdown: boolean = false;
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private providerService: ProviderService
  ) {
    this.registrationForm = this.fb.group({
      provider_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      city_id: ['', Validators.required],
      address: ['', Validators.required],
      service_ids: [[], Validators.required], // For multiple services
      qualification: [''],
      bio: [''],
      experience: ['']
    });
  }

  ngOnInit(): void {
    this.registrationForm.get('confirm_password')?.valueChanges.subscribe(() => {
      this.passwordMismatch = this.registrationForm.get('password')?.value !== this.registrationForm.get('confirm_password')?.value;
    });

    this.getServices();
    this.getCites();
  }

  getCites(): void {
    this.providerService.getCities().subscribe(
      (data) => {
        this.cities = data.map((city: { city_id: string; name: string }) => ({
          city_id: city.city_id,
          city_name: city.name
        }));
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  getServices(): void {
    this.providerService.getServices().subscribe(
      (data) => {
        this.services = data.map((service: { service_id: string; service_name: string }) => ({
          service_id: service.service_id,
          service_name: service.service_name
        }));
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  onServiceSelect(event: Event): void {
    const serviceId = (event.target as HTMLSelectElement).value;
    if (serviceId && !this.selectedServiceIds.includes(serviceId)) {
      this.selectedServiceIds.push(serviceId);
      this.registrationForm.patchValue({ service_ids: this.selectedServiceIds });
      (event.target as HTMLSelectElement).selectedIndex = 0; // Reset the select
      this.showAddServiceDropdown = false; // Close dropdown
    }
  }

  removeService(serviceId: string): void {
    const index = this.selectedServiceIds.indexOf(serviceId);
    if (index > -1) {
      this.selectedServiceIds.splice(index, 1);
      this.registrationForm.patchValue({ service_ids: this.selectedServiceIds });
    }
  }

  isServiceSelected(serviceId: string): boolean {
    return this.selectedServiceIds.includes(serviceId);
  }

  getServiceName(serviceId: string): string {
    const service = this.services.find(s => s.service_id === serviceId);
    return service ? service.service_name : '';
  }
  onSubmit(): void {
    if (this.registrationForm.invalid || this.passwordMismatch) {
      this.message = 'Please fill out the form correctly.';
      alert(this.message);
      return;
    }
  
    const formData = this.registrationForm.value;
  
    // Ensure only selected service IDs are sent to the backend
    formData.service_ids = formData.service_ids.filter((service_id: string) => 
      this.services.some((service: { service_id: string }) => service.service_id === service_id)
    );
  
    this.http.post<{ message: string }>('http://127.0.0.1:5000/provider/signup', formData)
      .subscribe({
        next: (response) => {
          this.message = response.message;
          console.log(this.message);
  
          // alert(this.message); // Alert the response message
  
          if (response.message.includes('Successfully')) {
            this.registrationForm.reset();
            console.log(345);

            this.selectedServiceIds = []; // Reset selected services
            console.log(123);

            this.router.navigate(['/login']); // Navigate to login page
          }
        },
        error: (error) => {
          if (error.error && error.error.message) {
            alert(error.error.message); // Show error message from backend
          } else {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
          }
        }
      });
  }
}