import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { CropDetails } from 'src/app/cropdetails/cropdetails';
import { CropdetailsService } from 'src/app/cropdetails/cropdetails.service';
import { DealerService } from '../dealer.service';
import { CartItem } from '../cartItem';

@Component({
  selector: 'app-viewcrops',
  templateUrl: './viewcrops.component.html',
  styleUrls: ['./viewcrops.component.css']
})
export class ViewcropsComponent implements OnInit {

  crops: CropDetails[] = [];

  dname: string = '';

  cartItems: number = 0;

  constructor(private dealerService: DealerService, private cropService: CropdetailsService, private router: ActivatedRoute, private authService: AuthService) {

  }

  private unsubscriber : Subject<void> = new Subject<void>();

  ngOnInit() {
    this.getAllCrops();
    this.router.paramMap.subscribe(
      (param) => {
        this.dname = param.get('name')!;
      }
    );

   

    this.cartItemFunc();
    
    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't go back at this time.`);
   });

   
  }

  getAllCrops() {
    this.dealerService.viewCrops().subscribe(
      (data) =>
      {
      this.crops = data;
      console.log(this.crops);
      }
    );
  }


  addItem(crop: CropDetails) {
    if (crop.quantity != 10) {
      crop.quantity += 1;
    }
  }

  removeItem(crop: CropDetails) {
    if (crop.quantity != 1) {
      crop.quantity -= 1;
    }
  }

  itemsCart: any = [];
 

  addtoCart(crop: CropDetails) {
    let cartDataNull =
      localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(crop);
      localStorage.setItem
        ('localCart',
          JSON.stringify(storeDataGet));
    }
    else {
      var id = crop.cid;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart')!);
      for(let i = 0; i < this.itemsCart.length; i++) {
        if (id ===
          this.itemsCart[i].cid) {
          this.itemsCart[i].quantity =
            crop.quantity;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(crop);
        localStorage.setItem
          ('localCart', JSON.stringify
            (this.itemsCart));
      }
      else {
        localStorage.setItem
          ('localCart', JSON.stringify
            (this.itemsCart));
      }
    }
    var alertPlaceholder= document.getElementById('alert')!;
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + 'info' + ' alert-dismissible" role="alert">' + 'Crop Added to Cart!' + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper);
     this.cartItemFunc();
  }

  logout(){
    this.authService.loggedOut();
  }


cartItemFunc(){
if(localStorage.getItem('localCart') != null){
var cartCount = JSON.parse(localStorage.getItem('localCart')!);
this.cartItems = cartCount.length;
}
}



}
