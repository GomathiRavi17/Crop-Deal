import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { farmer } from '../farmer';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-farmers-details',
  templateUrl: './farmers-details.component.html',
  styleUrls: ['./farmers-details.component.css']
})
export class FarmersDetailsComponent implements OnInit {

  fname: string = '';

  farmerDetails: farmer = {
    fid: 0,
    name: '',
    image: '',
    email: '',
    address: {
      houseNo: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: ''
    },
    contact: '',
    about: ''
  }

  constructor(private route: ActivatedRoute, private farmerService: FarmerService, private router: Router, private authService: AuthService) {

  }

  private unsubscriber : Subject<void> = new Subject<void>();

  ngOnInit() {
    this.route.paramMap.subscribe(
      (param) => {
         this.fname = param.get('name')!;
        this.viewDetail(this.fname);
      }
    );

    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't go back at this time.`);
   });
  }

  viewDetail(name:string) {
    this.farmerService.getFarmerByName(name).subscribe(
      (data) => this.farmerDetails = data
    );
  }

  navigate(){
    var user = JSON.parse(localStorage.getItem("currentUser")!);

    if(user.role == "ROLE_FARMER"){
      this.router.navigate(['/farmer-dashboard',this.fname]);
    }
    else{
      this.router.navigate(['admin-dashboard']);
    }
  }

  viewCrops(){
    var user = JSON.parse(localStorage.getItem("currentUser")!);

    if(user.role == "ROLE_FARMER"){
      this.router.navigate(['/farmer/viewcrops',this.fname]);
    }
    else{
      this.router.navigate(['/cropdetails/all']);
    }
  }
  
  logout(){
    this.authService.loggedOut();
  }
}
