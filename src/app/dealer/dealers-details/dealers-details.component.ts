import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { dealer } from '../dealer';
import { DealerService } from '../dealer.service';

@Component({
  selector: 'app-dealers-details',
  templateUrl: './dealers-details.component.html',
  styleUrls: ['./dealers-details.component.css']
})
export class DealersDetailsComponent implements OnInit{

  dname: string = '';


  dealer: dealer = {
    did: 0,
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

  constructor(private dealerService: DealerService, private router: ActivatedRoute, private route: Router, private authService: AuthService){

  }

  getDealerByName(name:string){
    this.dealerService.getDealerByName(name).subscribe(
      (data) => {
        console.log(data)
        this.dealer = data
      }
    );
  }

  ngOnInit(){
    this.router.paramMap.subscribe(
      (param) => {
        this.dname = param.get('name')!;
        this.getDealerByName(this.dname);
      }
    );
  }

  navigate(){
    var user = JSON.parse(localStorage.getItem("currentUser")!);

    if(user.role == "ROLE_DEALER"){
      this.route.navigate(['/dealer-dashboard',this.dname]);
    }
    else{
      this.route.navigate(['admin-dashboard']);
    }
  }

  logout(){
    this.authService.loggedOut();
  }

}
