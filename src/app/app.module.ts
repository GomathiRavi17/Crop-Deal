import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { FarmerModule } from './farmer/farmer.module';
import { DealerModule } from './dealer/dealer.module';
import { CropdetailsModule } from './cropdetails/cropdetails.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    FarmerModule,
    FormsModule,
    ReactiveFormsModule,
    DealerModule,
    CropdetailsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
