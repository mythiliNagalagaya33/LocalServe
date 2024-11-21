import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-pending-providers',
  templateUrl: './pending-providers.component.html',
  styleUrl: './pending-providers.component.css'
})
export class PendingProvidersComponent implements OnInit{
  pendingProviders: any[] = [];   
  
  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    this.fetchPendingProviders();
  }

  fetchPendingProviders() {
    this.AdminService.getPendingProviders().subscribe(
      (response) => {
        console.log('Pending Providers:', response);
        this.pendingProviders = response.pending_providers;
      },
      (error) => {
        console.error('Error fetching pending providers:', error);
      }
    );
  }

  approveProvider(providerId: string) {
    this.AdminService.approveProvider(providerId).subscribe(
      (response) => {
        console.log(response.message);
        this.fetchPendingProviders(); // Refresh the list
      },
      (error) => {
        console.error('Error approving provider:', error);
      }
    );
  }

  rejectProvider(providerId: string) {
    this.AdminService.rejectProvider(providerId).subscribe(
      (response) => {
        console.log(response.message);
        this.fetchPendingProviders(); // Refresh the list
      },
      (error) => {
        console.error('Error rejecting provider:', error);
      }
    );
  }

}
