import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { DealerService } from '../dealer.service';

@Component({
  selector: 'app-dealer-dashboard',
  templateUrl: './dealer-dashboard.component.html',
  styleUrls: ['./dealer-dashboard.component.css']
})
export class DealerDashboardComponent implements OnInit{

   dname: string = '';
   isProfileAdded: boolean = false;

  constructor(private router: ActivatedRoute, private authService: AuthService, private dealerService:DealerService){

  }

  private unsubscriber : Subject<void> = new Subject<void>();

  ngOnInit(){
     this.router.paramMap.subscribe(
      (params) => {this.dname = params.get('name')!;
      console.log(this.dname);}
     );
     this.checkProfileAdded(this.dname);
     history.pushState(null,'', location.href);
     fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
      alert(`You can't make changes or go back at this time.`);
    });
  }

  
ngOnDestroy(): void {
  this.unsubscriber.next();
  this.unsubscriber.complete();
}

  logout(){
    this.authService.loggedOut();
  }

  checkProfileAdded(name: string){
    this.dealerService.getDealerByName(name).subscribe(
      (dealer) => {
        if(dealer.name === name){
          this.isProfileAdded = true
        }
      }
    )
  }
}  
