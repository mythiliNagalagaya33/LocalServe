import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user: any; // Input property to receive user data
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.userForm = this.fb.group({
      // user_id: [{ value: '', disabled: true }],
      // user_name: [''],
      // email: [''],
      // phone_number: [''],
      // street_address: [''],
      // city_id: ['']
    });
  }

  ngOnInit() {
    if (this.user) {
      // this.userForm.patchValue(this.user); // Populate the form with user data
    }
  }

  saveChanges() {
    // if (this.userForm.valid) {
    //   // Handle save logic here, e.g., update user data
    //   console.log(this.userForm.value);
    // }
  }
}
