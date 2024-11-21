import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProviderService } from 'src/app/provider/provider.service';
import { AuthService } from 'src/app/auth.service';

declare var bootstrap: any;  // Add this line here to declare bootstrap


@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit,AfterViewInit {
  user: any; // Input property to receive user data
  userForm: any;
  userId: string="";
  showModal: boolean = false;
  cities: any[] = []; // Array to hold cities
  notifications: any[] = []; // To store notifications
  hasNewNotifications: any;


  // 
  constructor(private userService: UserServiceService, private fb: FormBuilder,private providerService: ProviderService,  private authService: AuthService) {
    this.checkForNewNotifications();

  }

ngOnInit() {

  this.userForm = this.fb.group({
    user_name: [''],
    email: [''],
    phone_number: [''],
    street_address: [''],
    city_id: ['']
  });
  
  this.userService.getUser().subscribe((userData) => {
    this.user=userData
    this.userForm.patchValue(userData);
    this.fetchCities();
    });
    this.loadNotifications();

  
  
}


loadNotifications() {
  this.userService.getNotifications().subscribe(
    (data: any) => {
      this.notifications = data.reverse();
      console.log('Notifications loaded:', data);
      this.checkForNewNotifications();
    },
    (error: any) => {
      console.error('Error fetching notifications', error);
    }
  );
}


checkForNewNotifications() {
  this.hasNewNotifications = this.notifications.some(notification => !notification.is_read);
}

markAllNotificationsAsRead(): void {
  this.userService.markAllNotificationsAsRead().subscribe(
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
ngAfterViewInit(): void {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl: any) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

fetchCities() {
  this.providerService.getCities().subscribe(
    (data) => {
      this.cities = data; // Assign fetched cities to the cities array
    }
  );
}

openUserModal(userId: string): void {
  this.userId = userId; // Set the user ID
  this.loadUserDetails(userId); // Load user details
  this.showModal = true;
}
loadUserDetails(userId: string): void {
  this.userService.getUser().subscribe((userData) => {
    this.userForm.patchValue(userData); // Populate the form with user data
  });
  
}
saveChanges() {
  if (this.userForm.valid) {
    const updatedUserData = this.userForm.value; // Get updated form values
    this.userService.updateUser(this.userId, updatedUserData).subscribe(
      (response) => {
        alert('Details updated successfully');
        console.log('Details updated successfully:', response);
        this.closeModal();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating user:', error.message);
      }
    );
  }
}

  // ngOnInit(): void {
  //   this.userService.getUser().subscribe(
      
  //     data=>{this.user=data}
  //   );
  // }
  closeModal() {
    this.showModal = false;
  }

  getUserInitials(userName: string): string {
    if (!userName) return '';
    const nameParts = userName.split(' ');
    let initial=nameParts[0].toUpperCase(); 
    // let initials = nameParts.map(part => part[0].toUpperCase()).join('');
    return initial.charAt(0); // Show up to 2 initials (first and last name)
  }
  
  onLogout(): void {
    this.authService.logout();
  }


  }



  

