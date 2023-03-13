import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-add-farmer',
  templateUrl: './add-farmer.component.html',
  styleUrls: ['./add-farmer.component.css']
})
export class AddFarmerComponent implements OnInit {

  fname: string = '';
   
  constructor(private fb: FormBuilder, 
    private farmerService: FarmerService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
    ){
    
  }

  private unsubscriber : Subject<void> = new Subject<void>();

  ngOnInit(){
    this.route.paramMap.subscribe(
      (param) => this.fname = param.get('name')!
    );
    this.addForm.patchValue({
      name: this.fname
    })

    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't go back at this time.`);
   });
  }

  addForm = this.fb.group({
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
    contact: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
    about: ['',[Validators.required, Validators.pattern('^[a-zA-Z\,\. ]*$'), Validators.minLength(20)]]
  });

  onSubmit(){
    this.farmerService.addFarmer(this.addForm.value).subscribe(
  {
    next: (data) =>{
      if(confirm("Added Data Successfully!")){
        this.router.navigate(['/farmer/view',this.name]);
      }
    },
    error: (data) => console.log(data)
  }
    );
  }

  get name(){
    return this.addForm.get('name');
  }

  get email(){
    return this.addForm.get('email');
  }

  get image(){
    return this.addForm.get('image');
  }

  get contact(){
    return this.addForm.get('contact');
  }

  get about(){
    return this.addForm.get('about');
  }

  get houseNo(){
    return this.addForm.get('address')?.get('houseNo');
  }

  get street(){
    return this.addForm.get('address')?.get('street');
  }

  get city(){
    return this.addForm.get('address')?.get('city');
  }

  get district(){
    return this.addForm.get('address')?.get('district');
  }

  get state(){
    return this.addForm.get('address')?.get('state');
  }

  get pincode(){
    return this.addForm.get('address')?.get('pincode');
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

  logout(){
    this.authService.loggedOut();
  }
}
