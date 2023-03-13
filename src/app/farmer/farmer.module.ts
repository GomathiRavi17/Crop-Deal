import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { FarmerRoutingModule } from './farmer-routing.module';
import { FarmersListComponent } from './farmers-list/farmers-list.component';
import { FarmersDetailsComponent } from './farmers-details/farmers-details.component';
import { AddFarmerComponent } from './add-farmer/add-farmer.component';
import { EditFarmerComponent } from './edit-farmer/edit-farmer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CropdetailsModule } from '../cropdetails/cropdetails.module';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { CropComponent } from './crop/crop.component';
import { FilterPipe } from '../filter.pipe';



@NgModule({
  declarations: [
    FarmersListComponent,
    FarmersDetailsComponent,
    AddFarmerComponent,
    EditFarmerComponent,
    FarmerDashboardComponent,
    CropComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FarmerModule { }
