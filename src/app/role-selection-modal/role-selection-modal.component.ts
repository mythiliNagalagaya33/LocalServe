import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-role-selection-modal',
  templateUrl: './role-selection-modal.component.html',
  styleUrls: ['./role-selection-modal.component.css']
})
export class RoleSelectionModalComponent {
  roles: any[] = []; // Define roles as an array of objects containing role names and tokens
  message: string = '';
  selectedRole: string = '';
  selectedToken: string = ''; // Store the selected token

  constructor(
    public dialogRef: MatDialogRef<RoleSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private authService: AuthService // Inject AuthService to manage the token
  ) {
    // Check the structure of `data` and parse it accordingly
    if (data && data.roles) {
      this.roles = data.roles;
    }
    if (data && data.message) {
      this.message = data.message;
    }
  }

  selectRole() {
    // Find the selected role and its corresponding token
    const selectedRoleData = this.roles.find(role => role.role === this.selectedRole);

    if (selectedRoleData) {
      this.selectedToken = selectedRoleData.token;

      // Save the selected role and token using AuthService and localStorage
      localStorage.setItem('role', this.selectedRole); // Store role
      this.authService.setToken(this.selectedToken); // Store the token using AuthService

      console.log('Selected Role:', this.selectedRole);
      console.log('Selected Token:', this.selectedToken);

      // Navigate based on the selected role
      if (this.selectedRole === 'user') {
        this.router.navigate(['/user']);
      } else if (this.selectedRole === 'provider') {
        this.router.navigate(['/provider/bookings']);
      }
    }

    this.dialogRef.close(this.selectedRole); // Close modal after selection
  }
}
