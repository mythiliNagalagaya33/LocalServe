import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ServiceResponse {
  message: string;
}

interface Service {
  service_name: string;
  description: string;
  pricing: number | null;
  image_url: string;
}

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {
  services: Service[] = [];
  newServiceForm: FormGroup;
  isAddServiceVisible: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.newServiceForm = this.fb.group({
      service_name: ['', Validators.required],
      description: [''],
      pricing: ['', [Validators.required, Validators.min(0)]],
      image_url: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.http.get<Service[]>('http://localhost:5000/localservices').subscribe((data) => {
      this.services = data;
    }, error => {
      console.error('Error fetching services:', error);
    });
  }

  addService() {
    if (this.newServiceForm.valid) {
      this.http.post<ServiceResponse>('http://localhost:5000/localservices/addservice', this.newServiceForm.value).subscribe(
        (response) => {
          alert(response.message);
          this.getServices(); // Refresh the service list
          this.newServiceForm.reset(); // Reset form
          this.isAddServiceVisible = false; // Hide form
        },
        error => {
          console.error('Error adding service:', error);
          alert('Failed to add service. Please try again.');
        }
      );
    }
  }

  toggleAddService() {
    this.isAddServiceVisible = !this.isAddServiceVisible;
  }
}
