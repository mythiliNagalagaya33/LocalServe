import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit{
  title = 'localserve';
  show(fc: any): void {
    console.log(fc);
  }
  constructor(private router : Router){}
  ngOnInit(): void {
    let token = localStorage.getItem('jwtToken')
    if(token){
      let  role = localStorage.getItem('role')
      this.router.navigate([`${role}`])
  }
 

  

}





}








// export class AppComponent implements OnInit {
//   weather: { temperature: number; condition: string } ={ temperature: 0, condition: '' };
//   weatherUpdates = new Observable<{ temperature: number; condition: string }>((observer: Observer<{ temperature: number; condition: string }>) => {
//     // Simulate weather data
//     const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];
    
//     setInterval(() => {
//       const temperature = Math.floor(Math.random() * 30) + 1; 
//       const condition = conditions[Math.floor(Math.random() * conditions.length)];  
//       this.weather.temperature=temperature;
//       this.weather.condition=condition;
//       observer.next({ temperature, condition }); 
//     }, 3000);  
//   });

//   ngOnInit() {
//     // Subscribe to the observable
//     this.weatherUpdates.subscribe({
//       next: (weather) => {
//         console.log('Weather Update:', weather);  // Log the weather update
        
//       },
//     });
//   }

  // name?:any

  // Date= Date();
  // amount = 60980
  // pi = 783.12345678912341234
  // fraction=0.123412342345
  // person1={
   

  //   name:"mythili",
  //   age:23,
  //   gender:"female"

  // }

  // color="red"
  // bottle?:any
  // bottles($event:any){
  //   this.bottle=$event


 





  // url = "assets/location.jpg"
  // color:string= "green"
  // color2:string="background-color:blue"

  // height:string ="height:900px"
//   showData = true;

  
//  mobiles = [
//   {
//     name: "samsung",
//     price: 10000
//   },
//   {
//     name: "redmi",
//     price: 2000
//   },
//   {
//     name: "apple",
//     price: 30000
//   }
//  ]  
//   name:string=""
//   price:number=0
//   mobiles:any[]= []



//   addMobile(){
//     let mob = {
//       name:this.name,
//       price:this.price
//     }
//    this.mobiles.push(mob)
//    this.name=""
//    this.price=0
//   }
 
// }






  // Clicked(){
  //   alert("clicked");
  // }
  // counter = 0;
  // increment(){
  //   alert("clicked")
  //   this.counter = this.counter + 1;
  // }

  // decrement(){
  //   alert("clicked")
  //   this.counter = this.counter - 1;
  // }

  // title = 'localserve';











//   path: string = './assets/location.jpg';
//   cname: string = 'cityname border lightgreen'; 
//   d:string = new Date().toLocaleTimeString();

//   time= setInterval(() => {
//     this.d = new Date().toLocaleTimeString();
//   }, 1000);
//   status:string = "stop";
//  click:boolean = true;

//   test(){
//     if (this.click){
//       this.click = false;
//       clearInterval(this.time);
//       this.status = "start"
//     }else{
//       this.click = true;
//       this.time = setInterval(() => {
//         this.d = new Date().toLocaleTimeString();
//       }, 1000);
//       this.status = "stop"
      
//     }
    

//   }

//   test1(){
//     return "hello";

//   }

//  myURL:string = window.location.href; 


//   containerId = 'main-container';

//   tests:string = "text-primary";
  
//   styles = {
//     'text-primary': true,
//     'color': 'red',
//     'font-weight': 'bold'
//   }
//   buttonTitle = 'Click me for more information';

//   newUrl:string = window.location.href;
//   linkTarget = "_blank";
//     linkUrl = 'https://angular.io';
//     linkRel = 'noopener noreferrer';


//     cellColspan = '2';


//     ischecked = true;
//     isdisabled = false;




  
  

