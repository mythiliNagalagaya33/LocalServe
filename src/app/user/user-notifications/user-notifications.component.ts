import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.css']
})
export class UserNotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private userservice: UserServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.userservice.getNotifications().subscribe(
      (data: any) => {
        this.notifications = [...data.reverse(), ...this.notifications]; // Add new notifications to the top
        console.log('Notifications loaded:', data);
      },
      (error: any) => {
        console.error('Error fetching notifications', error);
      }
    );
  }

  getSanitizedDescription(description: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

  extractLink(description: string): string | null {
    const linkMatch = description.match(/\/user\/feedback\/(.*?)(?=\s|$)/);
    return linkMatch ? linkMatch[0] : null;
  }

  extractTextBeforeLink(description: string): string {
    if (!description) {
      return ''; // Ensure description is not null or undefined
    }
    const linkMatch = description.match(/<a.*?>(.*?)<\/a>/);
    return linkMatch ? description.replace(linkMatch[0], '').trim() : description;
  }

  getBookingIdFromDescription(description: string): string | null {
    if (!description) {
      return null; // Ensure description is not null or undefined
    }
    const match = description.match(/\/user\/feedback\/([a-zA-Z0-9-]+)/);
    return match ? match[1] : null;
  }
}
