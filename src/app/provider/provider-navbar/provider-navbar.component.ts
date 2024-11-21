import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-provider-navbar',
  templateUrl: './provider-navbar.component.html',
  styleUrls: ['./provider-navbar.component.css']
})
export class ProviderNavbarComponent implements OnInit {
  
  notifications: any[] = []; // To store notifications
  hasNewNotifications: any;

  

  constructor(private authService: AuthService,private providerService: ProviderService) {
    this.checkForNewNotifications();
   }

  ngOnInit(): void {
    this.loadNotifications(); // Load notifications on component initialization
  }

    // Method to load notifications from the backend
    loadNotifications() {
      this.providerService.getNotifications().subscribe(
        (response: any[]) => {
          this.notifications = response.reverse();
          this.checkForNewNotifications(); // Check for new notifications after loading
        },
        (error) => {
          console.error('Error loading notifications:', error);
        }
      );
    }

    checkForNewNotifications() {
      this.hasNewNotifications = this.notifications.some(notification => !notification.is_read);
    }
  
    // Mark all notifications as read
    markAllNotificationsAsRead(): void {
      this.providerService.markAllNotificationsAsRead().subscribe(
        (response) => {
          console.log('All notifications marked as read:', response);
          // After marking as read, update notifications and hide the red dot
          this.notifications.forEach(notification => notification.is_read = true);
          this.hasNewNotifications = false; // Reset the notification state
        },
        (error) => {
          console.error('Error marking notifications as read:', error);
        }
      );
    }

  onLogout(): void {
    this.authService.logout();
  }

}
