import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CropdetailsRoutingModule } from './cropdetails-routing.module';
import { AddCropComponent } from './add-crop/add-crop.component';
import { EditCropComponent } from './edit-crop/edit-crop.component';
import { CropsListComponent } from './crops-list/crops-list.component';
import { CropsDetailsComponent } from './crops-details/crops-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCropComponent,
    EditCropComponent,
    CropsListComponent,
    CropsDetailsComponent
  ],
  imports: [
    CommonModule,
    CropdetailsRoutingModule,
    ReactiveFormsModule
  ]
})
export class CropdetailsModule { }
