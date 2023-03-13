import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { dealer } from '../dealer';
import { DealerService } from '../dealer.service';

@Component({
  selector: 'app-edit-dealer',
  templateUrl: './edit-dealer.component.html',
  styleUrls: ['./edit-dealer.component.css']
})
export class EditDealerComponent implements OnInit{
  did: number = 0;
  dname: string = '';

  dealerDetails: dealer = {
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

  constructor(private fb: FormBuilder, 
    private dealerService: DealerService,
     private route: ActivatedRoute,
     private router: Router,
     private authService: AuthService
     ) {

  }

  getFarmer(name: string) {
    this.dealerService.getDealerByName(name).subscribe(
      (dealer) => {
        this.did = dealer.did;
        this.updateForm.setValue({
        name: dealer.name,
        email: dealer.email,
        image: dealer.image,
        address: {
          houseNo: dealer.address.houseNo,
          street: dealer.address.street,
          city: dealer.address.city,
          district: dealer.address.district,
          state: dealer.address.state,
          pincode: dealer.address.pincode
        },
        contact: dealer.contact,
        about: dealer.about
      })
    }
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (param) => {
        this.dname = param.get('name')!;
        this.getFarmer(this.dname);
      }
    );
  }

  updateForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
    image: ['', [Validators.required]],
    address: this.fb.group({
      houseNo: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      street: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      district: ['', [Validators.required,  Validators.pattern('^[a-zA-Z ]*$')]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]]
    }),
    contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
    about: ['', [Validators.required, Validators.pattern('^[a-zA-Z\,\. ]*$')]]
  });



  update() {
    this.dealerDetails = {
      did: this.did,
      name: this.updateForm.get('name')?.value!,
      email: this.updateForm.get('email')?.value!,
      image: this.updateForm.get('image')?.value!,
      address: {
        houseNo: this.updateForm.get('address')?.get('houseNo')?.value!,
        street: this.updateForm.get('address')?.get('street')?.value!,
        city: this.updateForm.get('address')?.get('city')?.value!,
        district: this.updateForm.get('address')?.get('district')?.value!,
        state: this.updateForm.get('address')?.get('state')?.value!,
        pincode: this.updateForm.get('address')?.get('pincode')?.value!
      },
      contact: this.updateForm.get('contact')?.value!,
      about: this.updateForm.get('about')?.value!
    }
    this.dealerService.updateDealer(this.dealerDetails).subscribe(
      {
           next: (data) => {
            if(confirm("Updated Successfully!")){
            this.router.navigate(['/dealer/view', this.dname])
            }
          },
           error: (data) => console.log(data)
      }
    );
  }

  get name(){
    return this.updateForm.get('name');
  }

  get email(){
    return this.updateForm.get('email');
  }

  get image(){
    return this.updateForm.get('image');
  }

  get contact(){
    return this.updateForm.get('contact');
  }

  get about(){
    return this.updateForm.get('about');
  }

  get houseNo(){
    return this.updateForm.get('address')?.get('houseNo');
  }

  get street(){
    return this.updateForm.get('address')?.get('street');
  }

  get city(){
    return this.updateForm.get('address')?.get('city');
  }

  get district(){
    return this.updateForm.get('address')?.get('district');
  }

  get state(){
    return this.updateForm.get('address')?.get('state');
  }

  get pincode(){
    return this.updateForm.get('address')?.get('pincode');
  }

  navigate(){
    var user = JSON.parse(localStorage.getItem("currentUser")!);

    if(user.role == "ROLE_DEALER"){
      this.router.navigate(['/dealer-dashboard',this.dname]);
    }
    else{
      this.router.navigate(['admin-dashboard']);
    }
  }

  logout(){
    this.authService.loggedOut();
  }
}
