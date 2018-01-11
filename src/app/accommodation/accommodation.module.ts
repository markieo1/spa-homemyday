import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationService } from './accommodation.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AlertModule } from '../alert/alert.module';
import { AuthModule } from '../auth/auth.module';
<<<<<<< HEAD
import { AccommodationApproveComponent } from './accommodation-approve/accommodation-approve.component';
=======
import { AccommodationComponent } from './accommodation.component';
>>>>>>> a71765c49cedc572a00b0cd1329361312216eeba

@NgModule({
  declarations: [
    AccommodationComponent,
    AccommodationOverviewComponent,
    AccommodationCreateComponent,
<<<<<<< HEAD
    AccommodationApproveComponent
=======
>>>>>>> a71765c49cedc572a00b0cd1329361312216eeba
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AccommodationRoutingModule,
    AlertModule
  ],
  providers: [
    AccommodationService
  ],
  exports: []
})
export class AccommodationModule { }
