import { Component, OnInit } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { dealer } from '../dealer';
import { DealerService } from '../dealer.service';

@Component({
  selector: 'app-dealers-list',
  templateUrl: './dealers-list.component.html',
  styleUrls: ['./dealers-list.component.css']
})
export class DealersListComponent implements OnInit{
   dealers: dealer[] = [];

   constructor(private dealerService: DealerService, private authService: AuthService){

   }

   ngOnInit(){
     this.displayDealers();
   }

   private unsubscriber : Subject<void> = new Subject<void>();
   
   displayDealers(){
    this.dealerService.getAllDealers().subscribe(
      (data) => {
        console.log(data);
        this.dealers = data
      }
    );

    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't make changes or go back at this time.`);
   });

   }

   delete(id:number){
    if(confirm("Do you want to Delete?")){
    this.dealerService.deleteDealer(id).subscribe();
    location.reload();
    }
   }

   logout(){
    this.authService.loggedOut();
  }

}
