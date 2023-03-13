import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { FarmerService } from 'src/app/farmer/farmer.service';


@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.css']
})
export class AddCropComponent implements OnInit {

  
  fname: string = '';

  constructor(private fb: FormBuilder, 
    private farmerService: FarmerService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
    ){
    
  }

  ngOnInit(){
    this.route.paramMap.subscribe(
      (param) => this.fname = param.get('name')!
    );

    this.addForm.patchValue({
      fname: this.fname
    })
  }

  addForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    fname: [''],
    image: ['',[Validators.required]],
    cropType: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    desc: ['', [Validators.required, Validators.pattern('^[a-zA-Z\.\, ]*$'), Validators.maxLength(100),Validators.minLength(20)]],
    price: [Validators.required, Validators.min(1)],
    quantity: [Validators.required, Validators.min(1)],
    available: [Validators.required],
    location: ['',[Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    contact: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]]
  });

  onSubmit(){
    this.farmerService.addCrop(this.addForm.value, this.addForm.get('fname')?.value!).subscribe(
  {
    next: (data) => {
     if(confirm("Crop added Successfully!")){
      this.router.navigate(['/farmer/viewcrops',this.fname]);
      console.log(data);
     }
    },
    error: (data) => console.log(data)
  }
    );
  }

  get name(){
    return this.addForm.get('name');
  }

  get image(){
    return this.addForm.get('image');
  }

  get cropType(){
    return this.addForm.get('cropType');
  }

  get desc(){
    return this.addForm.get('desc');
  }

  get price(){
    return this.addForm.get('price');
  }

  get quantity(){
    return this.addForm.get('quantity');
  }

  get available(){
    return this.addForm.get('available');
  }

  get location(){
    return this.addForm.get('location');
  }
  
  get contact(){
    return this.addForm.get('contact');
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
