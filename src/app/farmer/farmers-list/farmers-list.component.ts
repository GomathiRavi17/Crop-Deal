import { Component, OnInit } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { farmer } from '../farmer';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-farmers-list',
  templateUrl: './farmers-list.component.html',
  styleUrls: ['./farmers-list.component.css']
})
export class FarmersListComponent implements OnInit{
  farmers: farmer[] = [];
  farmersByName: farmer[] = [];
  searchText: any;
 
  constructor(private farmerService: FarmerService, private authService: AuthService){
     
  }

  private unsubscriber : Subject<void> = new Subject<void>();

  ngOnInit(){
    this.displayAllFarmers();

    // this.sortByName();

    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't go back at this time.`);
   });
  }

  displayAllFarmers(){
    this.farmerService.getAllFarmers().subscribe(
      (data) => this.farmers = data
    );
  
    
  }

  delete(id:number){
    if(confirm("Do you want to delete?")){
    this.farmerService.deleteFarmer(id).subscribe();
    location.reload();
    }
  }

  

  logout(){
    this.authService.loggedOut();
  }

  search(event: any) {
    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText)
  }
}
