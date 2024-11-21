import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Service {
  service_name: string;
  image_url: string; // Change this according to your API response
  service_id: string; // Assuming you have an ID for routing
}

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  services: Service[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.http.get<Service[]>('http://localhost:5000/localservices').subscribe(
      (data) => {
        this.services = data.map(service => ({
          service_name: service.service_name,
          image_url: service.image_url,
          service_id: service.service_id 
          
        }));
        console.log(data)
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }
}
