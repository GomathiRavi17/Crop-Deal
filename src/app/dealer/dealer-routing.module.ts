import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CartComponent } from './cart/cart.component';
import { CreateDealerComponent } from './create-dealer/create-dealer.component';
import { DealerDashboardComponent } from './dealer-dashboard/dealer-dashboard.component';
import { DealersDetailsComponent } from './dealers-details/dealers-details.component';
import { DealersListComponent } from './dealers-list/dealers-list.component';
import { EditDealerComponent } from './edit-dealer/edit-dealer.component';
import { ViewcropsComponent } from './viewcrops/viewcrops.component';

const routes: Routes = [{
  path: 'dealer/all',
  component: DealersListComponent,
  canActivate: [AuthGuard]
},
{
  path: 'dealer/view/:name',
  component: DealersDetailsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'dealer/edit/:name',
  component: EditDealerComponent,
  canActivate: [AuthGuard]
},
{
  path: 'dealer/add/:name',
  component: CreateDealerComponent,
  canActivate: [AuthGuard]
},
{
  path: 'dealer-dashboard/:name',
  component: DealerDashboardComponent,
  canActivate: [AuthGuard]
},
{
  path: 'dealer/viewcrops/:name',
  component: ViewcropsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'dealer/cart/:name',
  component: CartComponent,
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
