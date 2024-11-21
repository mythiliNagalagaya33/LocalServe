import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-dashboard-overview',
  templateUrl: './admin-dashboard-overview.component.html',
  styleUrl: './admin-dashboard-overview.component.css'
})
export class AdminDashboardOverviewComponent {


  totalUsers: number = 0;
  totalProviders: number = 0;
  pendingRequests: number = 0; // Adjust this according to your logic



  users: any[] = [];
  providers: any[] = [];
  showUsers = false;
  showProviders = false;


  constructor(
    private adminService: AdminService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchTotalUsers(); // Get total users
    this.fetchTotalProviders(); // Get total providers
  }

  loadUsers(): void {
    this.adminService.getUsersList().subscribe((data) => {
      this.users = data;
      this.showUsers = true; // Show users when data is loaded
    });
  }

  loadProviders(): void {
    this.adminService.getProvidersList().subscribe((data) => {
      this.providers = data;
      this.showProviders = true; // Show providers when data is loaded
    });
  }

  fetchTotalUsers(): void {
    this.adminService.getUsersList().subscribe(
      users => {
        this.totalUsers = users.length; 
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchTotalProviders(): void {
    this.adminService.getProvidersList().subscribe(
      providers => {
        this.totalProviders = providers.length; 
      },
      error => {
        console.error('Error fetching providers:', error);
      }
    );
  }

  onTotalUsersClick(): void {
    if (!this.showUsers) {
      this.loadUsers(); // Load users if not already loaded
    } else {
      this.showUsers = false; 
    }
  }

  onTotalProvidersClick(): void {
    if (!this.showProviders) {
      this.loadProviders(); 
    } else {
      this.showProviders = false; // Hide providers if already displayed
    }
  }

}
