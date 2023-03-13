import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthRequest } from '../AuthRequest';
import { match } from '../shared/passwordValidator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  request: AuthRequest = {
    userName: '',
    password: ''
  }

  errorMsg = "";

  private unsubscriber : Subject<void> = new Subject<void>();
  
  ngOnInit(): void {
    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't go back at this time.`);
   });
  }
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){

  }

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.minLength(3)]],
    password: ['', [Validators.required]],
  },
  {
    validators: match('password','confirmPassword')
  }
  );

  get name(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  login(){
    this.request.userName = this.loginForm.get('username')?.value!;
    this.request.password = this.loginForm.get('password')?.value!;

    this.authService.login(this.request).subscribe(
    { 
      next: (data) =>
      {
        this.authService.storeToken(data.jwt);
        this.authService.getUserRole(this.request.userName).subscribe(
          {
            next: (user) =>{
              localStorage.setItem("currentUser", JSON.stringify(user));
              if(user.role == 'ROLE_FARMER'){
                console.log(user.role);
                this.router.navigate(['farmer-dashboard',this.request.userName])
              }
              else if(user.role == 'ROLE_DEALER'){
                console.log(user.role);
                this.router.navigate(['dealer-dashboard', this.request.userName])
              }
              else{
                this.router.navigate(['admin-dashboard'])
              }
            }
          }
         );
    
    },
    error: (data) => this.errorMsg = "Invalid Username/Password"
      }
  )
}

}

