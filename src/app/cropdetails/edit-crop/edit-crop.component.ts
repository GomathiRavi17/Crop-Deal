import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { DealerService } from 'src/app/dealer/dealer.service';
import { FarmerService } from 'src/app/farmer/farmer.service';
import { CropDetails } from '../cropdetails';
import { CropdetailsService } from '../cropdetails.service';

@Component({
  selector: 'app-edit-crop',
  templateUrl: './edit-crop.component.html',
  styleUrls: ['./edit-crop.component.css']
})
export class EditCropComponent {
  cid: number = 0;
  fname: string = '';

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

  constructor(private fb: FormBuilder, 
    private farmerService: FarmerService,
    private cropService: CropdetailsService,
     private route: ActivatedRoute,
     private router: Router,
     private authService: AuthService
     ) {

  }

  getCrop(id: number) {
    this.cropService.getCropById(id).subscribe(
      (crop) => this.updateForm.setValue({
        fname: crop.fname,
        name: crop.name,
        image: crop.image,
        cropType: crop.cropType,
        desc: crop.desc,
        price: crop.price,
        quantity: crop.quantity,
        available: crop.available,
        location: crop.location,
        contact: crop.contact
      })
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (param) => {
        this.cid = Number(param.get('id'));
        this.fname = param.get('name')!;
        this.getCrop(this.cid);
      }
    );
  }

  updateForm = this.fb.group({
    fname: [''],
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    image: ['',[Validators.required]],
    cropType: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    desc: ['', [Validators.required, Validators.pattern('^[a-zA-Z\.\, ]*$')]],
    price: [Validators.required],
    quantity: [Validators.required],
    available: [true,Validators.required],
    location: ['',[Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    contact: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]]
  });



  update() {
    this.cropDetails = {
      cid: this.cid,
      fname: this.updateForm.get('fname')?.value!,
      name: this.updateForm.get('name')?.value!,
      image: this.updateForm.get('image')?.value!,
      cropType: this.updateForm.get('cropType')?.value!,
      desc: this.updateForm.get('desc')?.value!,
      price: this.updateForm.get('price')?.value!,
      quantity: this.updateForm.get('quantity')?.value!,
      available: this.updateForm.get('available')?.value!,
      location: this.updateForm.get('location')?.value!,
      contact: this.updateForm.get('contact')?.value!  
    }
    this.farmerService.updateCrop(this.cropDetails, this.fname).subscribe(
      {
           next: (data) => {
            if(confirm("Crop Updated Successfully!")){
              this.router.navigate(['/farmer/viewcrops',this.fname]);
            }
           },
           error: (data) => console.log(data)
      }
    );
  }

  get name(){
    return this.updateForm.get('name');
  }

  get image(){
    return this.updateForm.get('image');
  }

  get cropType(){
    return this.updateForm.get('cropType');
  }

  get desc(){
    return this.updateForm.get('desc');
  }

  get price(){
    return this.updateForm.get('price');
  }

  get quantity(){
    return this.updateForm.get('quantity');
  }

  get available(){
    return this.updateForm.get('available');
  }

  get location(){
    return this.updateForm.get('location');
  }
  
  get contact(){
    return this.updateForm.get('contact');
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
