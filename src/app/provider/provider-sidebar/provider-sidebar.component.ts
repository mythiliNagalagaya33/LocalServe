import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-provider-sidebar',
  templateUrl: './provider-sidebar.component.html',
  styleUrls: ['./provider-sidebar.component.css']
})
export class ProviderSidebarComponent implements OnInit{

  editForm: FormGroup;
  // provider?: any; 
  profileImage: string | null = null; 
  defaultImage: string = 'assets/default-profile.png';
  service_provider?: any;

  constructor(private providerService: ProviderService,private authService: AuthService,
    private fb: FormBuilder) {
    this.editForm = this.fb.group({
      provider_name: [''],
      service_name: [''],
      email: [''],
      phone_number: [''],
      city_id: [''],
      address: [''],
      // password: [''] // Optional
    });
   }

  ngOnInit(): void {
    this.providerService.getProvider().subscribe(
      data => {
        this.service_provider = data;
        this.profileImage = this.service_provider.profile_image;
      }
    )

    
  }
  onLogout(): void {
    this.authService.logout();
  }

  // openEditModal(): void {
  //   this.editForm.patchValue(this.service_provider); // Populate the form with current provider data
  //   this.showModal = true; // Show the modal
  // }

  // closeModal(): void {
  //   this.showModal = false; // Hide the modal
  // }

  saveChanges(): void {
    if (this.editForm.valid) {
      this.providerService.updateProvider(this.service_provider.provider_id, this.editForm.value).subscribe(
        response => {
          alert('Provider details updated successfully');
          console.log('Update Response:', response);
          // this.closeModal(); // Close the modal
          this.ngOnInit(); // Refresh provider data
        },
        error => {
          console.error('Error updating provider:', error);
          alert('Failed to update provider details');
        }
      );
    }
  }
}
