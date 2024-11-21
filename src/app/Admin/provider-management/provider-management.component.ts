import { Component, OnInit } from '@angular/core';
// import { AdminService } from '../Admin/admin/admin.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-provider-management',
  templateUrl: './provider-management.component.html',
  styleUrls: ['./provider-management.component.css']
})
export class ProviderManagementComponent implements OnInit {
  providers: any[] = [];
  isModalVisible = false;  // Control visibility of the modal
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.fetchProviders();
  }

  fetchProviders() {
    this.adminService.getProvidersList().subscribe(
      (data) => {
        this.providers = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching providers', error);
      }
    );
  }
  toggleStatus(provider: any): void {
    // Call the service to toggle the provider's status
    this.adminService.toggleProviderStatus(provider.provider_id).subscribe(
      (response) => {
        // Update provider status in the UI after successful API call
        const updatedStatus = provider.status === 'Available' ? 'Unavailable' : 'Available';
        provider.status = updatedStatus;

        // Set the modal content based on the action
        if (updatedStatus === 'Unavailable') {
          this.modalTitle = 'Provider Deactivated';
          console.log('Provider deactivated');
          this.modalMessage = 'The provider is now unavailable. Please contact support for assistance if needed.';
        } else {
          this.modalTitle = 'Provider Reactivated';
          console.log('Provider reactivated');
          this.modalMessage = 'The provider is now available for bookings.';
        }

        // Show the modal
        this.isModalVisible = true;
      },
      (error) => {
        console.error('Error updating provider status', error);
        this.modalTitle = 'Error';
        this.modalMessage = 'There was an error processing your request.';
        this.isModalVisible = true;
      }
    );
  }

  editProvider(provider: any): void {
    // Navigate to an edit form, passing the provider data
    this.router.navigate(['/editprovider', provider.provider_id], { state: { provider } });
  }}