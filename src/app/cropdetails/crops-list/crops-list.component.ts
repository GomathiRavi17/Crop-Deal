import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { CropDetails } from '../cropdetails';
import { CropdetailsService } from '../cropdetails.service';

@Component({
  selector: 'app-crops-list',
  templateUrl: './crops-list.component.html',
  styleUrls: ['./crops-list.component.css']
})
export class CropsListComponent implements OnInit {


 cropdetails: CropDetails[] = [];
  constructor(private cropDetailsService: CropdetailsService, private authService: AuthService){

  }


  ngOnInit(){
    this.displayCropDetails();
  }

  displayCropDetails(){
    this.cropDetailsService.getAllCrops().subscribe(
      (data) => {
        console.log(data);
        this.cropdetails = data
      }
    );
   }

   deleteCrop(id: number){
    if(confirm("Do you want to delete?")){
    this.cropDetailsService.deleteCrop(id).subscribe();
    location.reload();
    }
   }

   logout(){
    this.authService.loggedOut();
  }
}
