import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/provider/provider.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.css']
})
export class ProviderProfileComponent implements OnInit {
  editForm: FormGroup;
  provider: any; // Provider data structure
  services: any[] = []; // Array to store services
  cities: any[] = []; // Array for cities
  isEditable = false;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private location: Location
  ) {
    this.editForm = this.fb.group({
      provider_name: [''],
      service_id: [''],
      email: [''],
      phone_number: [''],
      address: [''],
      city_id: [''],
      qualification: [''],
      experience: [''],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.fetchProvider();
    this.fetchCities();
    this.editForm.disable(); // Disable form on initialization
  }

  // Fetch provider data including services
  fetchProvider() {
    this.providerService.getProvider().subscribe(
      data => {
        this.provider = data;
        this.services = data.services || []; // Assign the services array from the API response
        console.log('Provider info:', data);
        this.editForm.patchValue(data); // Populate the form with provider data
      },
      error => {
        console.error('Error fetching provider:', error);
      }
    );
  }

  fetchCities() {
    this.providerService.getCities().subscribe(
      data => {
        this.cities = data;
      },
      error => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  saveChanges() {
    if (this.editForm.valid) {
      const updatedProviderData = this.editForm.value;
      this.providerService.updateProvider(this.provider.provider_id, updatedProviderData).subscribe(
        response => {
          alert('Provider updated successfully');
          this.isEditable = false; // Exit edit mode after saving
          this.editForm.disable(); // Disable form after saving
        },
        error => {
          console.error('Error updating provider:', error);
        }
      );
    }
  }

  toggleEdit() {
    this.isEditable = !this.isEditable; // Toggle edit mode
    if (this.isEditable) {
      this.editForm.enable(); // Enable form for editing
      this.editForm.controls['email'].disable(); // Keep email field read-only
    } else {
      this.editForm.disable(); // Disable form when not editing
    }
  }

  closeProfile() {
    this.location.back(); // Go back to the previous page
  }
}
