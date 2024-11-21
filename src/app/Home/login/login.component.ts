  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { LoginService, LoginResponse } from './login.service'; // Adjust the path as necessary
  import { Router } from '@angular/router'; 
  import { HttpErrorResponse } from '@angular/common/http';
  import { AuthService } from '../../auth.service';
  import { MatDialog } from '@angular/material/dialog';
  import { RoleSelectionModalComponent } from 'src/app/role-selection-modal/role-selection-modal.component';
  import Swal from 'sweetalert2';

  @Component({
      selector: 'app-login',
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
      loginForm: FormGroup;
      message: string = '';

      constructor(
          private fb: FormBuilder,
          private loginService: LoginService,
          private authService: AuthService,
          private router: Router,
          public dialog: MatDialog // Inject MatDialog for the role selection modal
      ) {
          this.loginForm = this.fb.group({
              email: ['', [Validators.required, Validators.email]], 
              password: ['', Validators.required],
              rememberMe: [false] 
          });
      }

      ngOnInit(): void {}



      onLogin(): void {
        console.log("enter");
        
        console.log('Login form:', this.loginForm.value);

          if (this.loginForm.valid) {
              const { email, password } = this.loginForm.value;

              this.loginService.login(email, password).subscribe(
                (response: LoginResponse) => {
                    // Handle successful login
                    console.log(`User role: ${response.role}`);
                    this.message = response.message;
            
                    if (response.status === 'pending') {
                        alert(response.message); // Simple alert for 'pending' status
                    } else if (response.status === 'inactive') {
                        this.router.navigate(['/user-inactive']);
                    } else if (response.roles && response.roles.length > 1) {
                        this.openRoleSelectionModal(response); // Open modal for multiple roles
                    } else if (response.roles && response.roles.length === 1) {
                        const roleInfo = response.roles[0];
                        this.authService.setToken(roleInfo.token);
                        localStorage.setItem('role', roleInfo.role);
                        this.router.navigate([`/${roleInfo.role}`]);
                    } else if (response.role) {
                        this.authService.setToken(response.token);
                        localStorage.setItem('role', response.role);
                        this.router.navigate([`/${response.role}`]);
                    } else {
                        console.error('Unexpected response structure:', response);
                    }
                },
                (error: HttpErrorResponse) => {
                    console.log('Error:', error);
                    switch (error.status) {

                        case 401:
                            console.log('Error status: 401'); // Log to confirm you're hitting the 401 block
                            console.log('Login error:', error.error.message);

                            if (error.error && error.error.message === 'Invalid credentials') {
                                console.log('Login error:', error.error.message);

                                Swal.fire({
                                    title: 'Login Failed',
                                    text: 'Invalid email or password. Please try again.',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                });
                            } else {
                                console.log('Login error:', error.error.message);
                            }
                            break;
                        

                        
                        case 403:
                            this.router.navigate(['/pending']);
                            console.log('Login error:', error.error.message);
                            break;
                        case 404:
                            this.router.navigate(['/user-inactive']);
                            console.log('Login error:', error.error.message);
                            break;
                        case 405:
                            this.router.navigate(['/provider-inactive']);
                            console.log('Login error:', error.error.message);
                            break;
                        default:
                            Swal.fire({
                                title: 'Error',
                                text: 'An unexpected error occurred. Please try again later.',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                            console.error('Unexpected error:', error);
                            break;
                    }
                }
            );
            
        }
    }
    
      // Make sure this method exists
    openRoleSelectionModal(response: LoginResponse): void {
        console.log('Opening role selection modal:', response);
        const dialogRef = this.dialog.open(RoleSelectionModalComponent, {
            width: '300px',
            data: response // Pass the response data (roles and message) to the modal
        });

        dialogRef.afterClosed().subscribe(selectedRole => {
            if (selectedRole) {
                console.log('Selected role:', selectedRole);
                let role_list = response.roles;
                role_list.reduce(( role:any) => {
                    if(role.role === selectedRole) {
                        this.authService.setToken(role.token);
                        localStorage.setItem('role', role.role);
                        this.router.navigate([`/${role.role}`]);
                    }
                })
            }
        });
    }
  }
