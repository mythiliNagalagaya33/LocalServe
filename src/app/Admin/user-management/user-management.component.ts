import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  isModalVisible = false;  // Control visibility of the modal
  modalTitle: string = '';
  modalMessage: string = '';



  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getUsersList().subscribe(
      (data) => {
        console.log(data);
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  toggleStatus(user: any): void {
    // Call the service to toggle the user's status
    this.adminService.toggleUserStatus(user.user_id).subscribe(
      (response) => {
        // Update user status in the UI after successful API call
        const updatedStatus = user.status === 'active' ? 'inactive' : 'active';
        user.status = updatedStatus;

        // Set the modal content based on the action
        if (updatedStatus === 'inactive') {
          this.modalTitle = 'Account Deactivated';
          console.log('Account deactivated');
          this.modalMessage = 'Your account has been temporarily deactivated. Please contact support for assistance.';
        } else {
          this.modalTitle = 'Account Reactivated';
          console.log('Account reactivated');
          this.modalMessage = 'Your account has been reactivated. You can now log in.';
        }

        // Show the modal
        this.isModalVisible = true;
      },
      (error) => {
        console.error('Error updating user status', error);
        this.modalTitle = 'Error';
        this.modalMessage = 'There was an error processing your request.';
        this.isModalVisible = true;
      }
    );
  }

  // Navigate to edit user page
  edit(user: any): void {
    this.router.navigate(['/edituser', user.id], { state: { user } });
  }
}




