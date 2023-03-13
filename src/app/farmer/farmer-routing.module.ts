import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AddFarmerComponent } from './add-farmer/add-farmer.component';
import { CropComponent } from './crop/crop.component';
import { EditFarmerComponent } from './edit-farmer/edit-farmer.component';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { FarmersDetailsComponent } from './farmers-details/farmers-details.component';
import { FarmersListComponent } from './farmers-list/farmers-list.component';

const routes: Routes = [
  {
    path: 'farmer-dashboard/:name',
    component: FarmerDashboardComponent,
    canActivate: [AuthGuard]
  },
  
  {
  path: 'farmer/all',
  component: FarmersListComponent,
  canActivate: [AuthGuard]
},
{
  path: 'farmer/add/:name',
  component: AddFarmerComponent,
  canActivate: [AuthGuard]
},
{
  path: 'farmer/edit/:name',
  component: EditFarmerComponent,
  canActivate: [AuthGuard]
},
{
  path: 'farmer/view/:name',
  component: FarmersDetailsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'farmer/viewcrops/:name',
  component: CropComponent,
  canActivate: [AuthGuard]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
