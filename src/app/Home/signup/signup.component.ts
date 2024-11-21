import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  passwordMismatch: boolean = false;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      user_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      phone: ['']
    });
  }

  ngOnInit(): void {
    // Check for password mismatch
    this.registrationForm.get('confirm_password')?.valueChanges.subscribe(() => {
      this.passwordMismatch = this.registrationForm.get('password')?.value !== this.registrationForm.get('confirm_password')?.value;
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid || this.passwordMismatch) {
      this.message = 'Please fill out the form correctly.';
      return;
    }

    const formData = this.registrationForm.value;

    // Send the form data to the backend
    this.http.post<{ message: string }>('http://127.0.0.1:5000/user/signup', formData)
      .subscribe({
        next: (response) => {
          this.message = response.message;
          if (response.message.includes('successfully')) {
            alert('successfully registered as user' );
            this.registrationForm.reset(); // Reset the form on successful submission
            this.router.navigate(['/login']); // Redirect to login page
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.message = 'An error occurred. Please try again.';
        }
      });
  }
}
