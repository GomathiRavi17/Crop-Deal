import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AddCropComponent } from './add-crop/add-crop.component';
import { CropsDetailsComponent } from './crops-details/crops-details.component';
import { CropsListComponent } from './crops-list/crops-list.component';
import { EditCropComponent } from './edit-crop/edit-crop.component';

const routes: Routes = [{
  path: 'cropdetails/all',
  component: CropsListComponent,
  canActivate: [AuthGuard]
},
{
  path: 'cropdetails/add/:name',
  component: AddCropComponent,
  canActivate: [AuthGuard]
},
{
  path: 'cropdetails/edit/:name/:id',
  component: EditCropComponent,
  canActivate: [AuthGuard]
},
{
  path: 'cropdetails/view/:id',
  component: CropsDetailsComponent,
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CropdetailsRoutingModule { }
