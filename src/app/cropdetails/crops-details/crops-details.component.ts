import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { CropDetails } from '../cropdetails';
import { CropdetailsService } from '../cropdetails.service';

@Component({
  selector: 'app-crops-details',
  templateUrl: './crops-details.component.html',
  styleUrls: ['./crops-details.component.css']
})
export class CropsDetailsComponent {
  cropDetails: CropDetails = {
    cid: 0,
    fname: '',
    name: '',
    image: '',
    cropType: '',
    desc: '',
    price: 0,
    quantity: 0,
    available: false,
    location: '',
    contact: ''
  }

  constructor(private route: ActivatedRoute, private cropService: CropdetailsService, private authService: AuthService,private router:Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (param) => {
        var id = Number(param.get('id'));
        this.viewDetails(id);
      }
    );
  }

  viewDetails(id: number) {
    this.cropService.getCropById(id).subscribe(
      (data) => this.cropDetails = data
    );
  }

  logout(){
    this.authService.loggedOut();
  }

  
  // navigate(){
  //   var user = JSON.parse(localStorage.getItem("currentUser")!);

  //   if(user.role == "ROLE_FARMER"){
  //     this.router.navigate(['/farmer-dashboard',this.fname]);
  //   }
  //   else{
  //     this.router.navigate(['admin-dashboard']);
  //   }
  // }


}
