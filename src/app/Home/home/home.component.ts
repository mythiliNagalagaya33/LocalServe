import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('jwtToken')
    if(token){
      let  role = localStorage.getItem('role')
      this.router.navigate([`${role}`])
  }
  }

}
