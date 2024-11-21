import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }


  onLogout(): void {
    this.authService.logout();
  }


}
