import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-provider-notification',
  templateUrl: './provider-notification.component.html',
  styleUrl: './provider-notification.component.css'
})
export class ProviderNotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  // Load notifications from the backend
  loadNotifications(): void {
    this.providerService.getNotifications().subscribe(
      (data: any) => {
        this.notifications = data;
        console.log('Notifications loaded:', data);
      },
      (error: any) => {
        console.error('Error fetching notifications', error);
      }
    );
  }
}

  
