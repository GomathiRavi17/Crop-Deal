import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DealerRoutingModule } from './dealer-routing.module';
import { CreateDealerComponent } from './create-dealer/create-dealer.component';
import { EditDealerComponent } from './edit-dealer/edit-dealer.component';
import { DealersListComponent } from './dealers-list/dealers-list.component';
import { DealersDetailsComponent } from './dealers-details/dealers-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DealerDashboardComponent } from './dealer-dashboard/dealer-dashboard.component';
import { ViewcropsComponent } from './viewcrops/viewcrops.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    CreateDealerComponent,
    EditDealerComponent,
    DealersListComponent,
    DealersDetailsComponent,
    DealerDashboardComponent,
    ViewcropsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    DealerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DealerModule { }
