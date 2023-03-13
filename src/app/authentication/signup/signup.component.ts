import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import { match } from '../shared/passwordValidator';
import { User } from '../User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  roleHasError = true;


  user: User = {
    userName: '',
    password: '',
    active: false,
    role: ''
  }

  unsubscriber : Subject<void> = new Subject<void>();

  ngOnInit(): void {
    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't make changes or go back at this time.`);
   });
  }

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) {

  }

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$'),Validators.maxLength(25)]],
    roles: [Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', Validators.required]
  },
    {
      validators: match('password', 'confirmPassword')
    }
  );

  validateTopic(value: any) {
    if (value === "default") {
      this.roleHasError = true;
    }
    else {
      this.roleHasError = false;
    }
  }

  get username() {
    return this.signupForm.get('username');
  }

  get roles() {
    return this.signupForm.get('roles');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  onSubmit() {
    this.user = {
      userName: this.signupForm.get('username')?.value!,
      password: this.signupForm.get('password')?.value!,
      active: true,
      role: this.signupForm.get('roles')?.value!
    }
    console.log(this.user);
    this.authService.register(this.user).subscribe(
      {
        next: (data) =>{ 
          if(confirm("Registered Successfully!")){
            this.router.navigate(['/login']);
            console.log(data);
          }
         
        },
        error: (data)=>console.log(data)
      }
    );
  }


}

