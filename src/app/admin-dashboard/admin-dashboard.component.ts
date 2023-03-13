import { Component, OnInit } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private authService: AuthService){

  }

  private unsubscriber : Subject<void> = new Subject<void>();

 ngOnInit(){
  history.pushState(null,'', location.href);
  fromEvent(window, 'popstate').pipe(
   takeUntil(this.unsubscriber)
 ).subscribe((_) => {
   history.pushState(null, '');
   alert(`You can't make changes or go back at this time.`);
 });
 }

  logout(){
    this.authService.loggedOut();
  }
}
