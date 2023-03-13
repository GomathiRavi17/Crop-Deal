import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { CropDetails } from 'src/app/cropdetails/cropdetails';
import { farmer } from '../farmer';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})
export class CropComponent implements OnInit{

    name: string = '';
    cropDetails: CropDetails[] = [];

   constructor(private farmerService: FarmerService, private route: ActivatedRoute, private authService: AuthService){
    
   }

  farmer: farmer = {
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
    about: '',
    cropDetails: []
  }

  private unsubscriber : Subject<void> = new Subject<void>();

 ngOnInit(){
   this.route.paramMap.subscribe(
    (param) => {
      this.name = param.get('name')!;
    }
   );
   this.getCropDetails();

   history.pushState(null,'', location.href);
   fromEvent(window, 'popstate').pipe(
    takeUntil(this.unsubscriber)
  ).subscribe((_) => {
    history.pushState(null, '');
    alert(`You can't go back at this time.`);
  });
 }

 
 getCropDetails(){
  this.farmerService.getFarmerByName(this.name).subscribe(
    (data) => {
      console.log(data);
      this.farmer = data;
      this.cropDetails = data.cropDetails;
    }
  );
}

deleteCrop(crop: CropDetails, fname:string){
  if(confirm("Do you want to delete?")) {
   this.farmerService.deleteCrop(crop, fname).subscribe(
    (data) => console.log(data)
   
   );
   location.reload();
  }
}

logout() {
  this.authService.loggedOut();
}


}

