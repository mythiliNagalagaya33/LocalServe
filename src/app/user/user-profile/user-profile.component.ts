import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  editForm: FormGroup;
  user: any; // Assuming user data structure is set somewhere in your code
  isEditable = false;
  cities: any[] = [];
  selectedCityName: string = ''; // Store the city name to display

  constructor(private fb: FormBuilder, private userService: UserServiceService, private location: Location) {
    this.editForm = this.fb.group({
      user_name: [''],
      email: [''],
      phone_number: [''],
      street_address: [''],
      city_id: ['']
    });
  }

  ngOnInit(): void {
    this.fetchUser();
    this.fetchCities(); // Fetch cities on component initialization

  }
  fetchUser() {
    this.userService.getUser().subscribe(data => {
      this.user = data;
      console.log('User info:', data);
  
      // Patch the form with user data
      this.editForm.patchValue({
        user_name: data.user_name,
        email: data.email,
        phone_number: data.phone_number,
        street_address: data.street_address,
        city_id: data.city_id
      });
  
      // Try to set the selected city name
      this.setSelectedCityName();
      this.editForm.disable();
    });
  }
  

  

  fetchCities() {
    this.userService.getCities().subscribe(
      (data) => {
        this.cities = data;
        console.log('cities' ,data)
        this.setSelectedCityName();
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }
  setSelectedCityName() {
    if (this.user && this.cities.length > 0) {
      const selectedCity = this.cities.find(city => city.city_id === this.user.city_id);
      if (selectedCity) {
        this.selectedCityName = selectedCity.name;
      } else {
        this.selectedCityName = 'Unknown'; // Fallback if city is not found
      }
    }
  }
  
  saveChanges() {
    if (this.editForm.valid) {
      const updatedUserData = this.editForm.value;
      console.log('Updated User Data:', updatedUserData);
      this.userService.updateUser(this.user.user_id, updatedUserData).subscribe(
        response => {
          alert('User updated successfully');
          console.log('User updated successfully:', response);
          this.isEditable = false; // Exit edit mode after saving
          this.editForm.disable(); // Disable form after saving
        },
        error => {
          console.error('Error updating user:', error);
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
