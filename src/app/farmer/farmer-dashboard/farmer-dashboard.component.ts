import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { farmer } from '../farmer';
import { FarmerService } from '../farmer.service';


@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {

  fname: string = '';
  fid: number = 0;

  isProfileAdded: boolean = false;

  private unsubscriber : Subject<void> = new Subject<void>();

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

  constructor(private route: ActivatedRoute, private authService: AuthService, private farmerService: FarmerService) {

  }

  getFarmerByName(name: string) {
    this.farmerService.getFarmerByName(name).subscribe(
      (farmer) => {
        this.farmerDetails = farmer
      }
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (param) => {
        this.fname = param.get('name')!;
        this.getFarmerByName(this.fname);
        console.log("Fid:"+this.farmerDetails.fid);
        this.fid = this.farmerDetails.fid;
      }
    );
    this.checkProfileAdded(this.fname);

    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't go back at this time.`);
   });
  }

  logout() {
    this.authService.loggedOut();
  }

  checkProfileAdded(name: string){
    this.farmerService.getFarmerByName(name).subscribe(
      (farmer) => {
        if(farmer.name === name){
          this.isProfileAdded = true
        }
      }
    )
  }

}
