import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { CropDetails } from 'src/app/cropdetails/cropdetails';
import { farmer } from '../farmer';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-edit-farmer',
  templateUrl: './edit-farmer.component.html',
  styleUrls: ['./edit-farmer.component.css']
})
export class EditFarmerComponent implements OnInit {

  fid: number = 0;
  fname: string = '';
  crops: CropDetails[] = [];

  msg = '';

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
    about: '',
    cropDetails: []
  }

  constructor(private fb: FormBuilder,
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

  }

  getFarmer(name: string) {
    this.farmerService.getFarmerByName(name).subscribe(
      (farmer) => {
        this.fid = farmer.fid,
        this.crops = farmer.cropDetails,
          this.updateForm.setValue({
            name: farmer.name,
            email: farmer.email,
            image: farmer.image,
            address: {
              houseNo: farmer.address.houseNo,
              street: farmer.address.street,
              city: farmer.address.city,
              district: farmer.address.district,
              state: farmer.address.state,
              pincode: farmer.address.pincode
            },
            contact: farmer.contact,
            about: farmer.about
          })
      }
    );
  }

  private unsubscriber : Subject<void> = new Subject<void>();

  ngOnInit() {
    this.route.paramMap.subscribe(
      (param) => {
        this.fname = param.get('name')!;
        this.getFarmer(this.fname);
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

  updateForm = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
    image: ['', [Validators.required]],
    address: this.fb.group({
      houseNo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      street: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      district: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z\. ]*$')]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]]
    }),
    contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
    about: ['', [Validators.required, Validators.pattern('^[a-zA-Z\,\. ]*$')]]
  });



  update() {
    this.farmerDetails = {
      fid: this.fid,
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
      about: this.updateForm.get('about')?.value!,
      cropDetails: this.crops
    }
    this.farmerService.updateFarmer(this.farmerDetails).subscribe(
      {
        next: (data) => {
          if (confirm("Updated Successfully")) {
            this.router.navigate(['/farmer/view', this.fname])
            console.log(data)
          }
        },
        error: (data) => console.log(data)
      }
    );
  }

  get name() {
    return this.updateForm.get('name');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get image() {
    return this.updateForm.get('image');
  }

  get contact() {
    return this.updateForm.get('contact');
  }

  get about() {
    return this.updateForm.get('about');
  }

  get houseNo() {
    return this.updateForm.get('address')?.get('houseNo');
  }

  get street() {
    return this.updateForm.get('address')?.get('street');
  }

  get city() {
    return this.updateForm.get('address')?.get('city');
  }

  get district() {
    return this.updateForm.get('address')?.get('district');
  }

  get state() {
    return this.updateForm.get('address')?.get('state');
  }

  get pincode() {
    return this.updateForm.get('address')?.get('pincode');
  }

  logout(){
    this.authService.loggedOut();
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
}
