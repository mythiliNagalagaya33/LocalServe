import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  constructor(private providerService: ProviderService ) { }

  ngOnInit(): void {
    this.providerService.getProvider().subscribe(
      data => {
        console.log(data);
        this.providerService.provider = data;
      }
    )
  }

}
