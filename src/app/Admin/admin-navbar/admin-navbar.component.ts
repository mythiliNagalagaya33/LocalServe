import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
  }

}
