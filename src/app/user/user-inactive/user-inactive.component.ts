import { Component } from '@angular/core';

@Component({
  selector: 'app-user-inactive',
  standalone: true,
  imports: [],
  templateUrl: './user-inactive.component.html',
  styleUrl: './user-inactive.component.css'
})
export class UserInactiveComponent {
  message: string = 'Your account has been temporarily deactivated. Please contact support for assistance.';
  email: string = 'localservesupport@gmail.com';
}
