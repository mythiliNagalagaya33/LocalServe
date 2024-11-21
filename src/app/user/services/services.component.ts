import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';


interface Service {
  service_name: string;
  image_url: string; // Change this according to your API response
  service_id: string; // Assuming you have an ID for routing
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.userService.getServices().subscribe(
      (data) => {
        this.services = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }
}
