import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationService } from './accommodation.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationEditComponent } from './accommodation-edit/accommodation-edit.component';
import { AlertModule } from '../alert/alert.module';
import { AuthModule } from '../auth/auth.module';
import { AccommodationApproveComponent } from './accommodation-approve/accommodation-approve.component';
import { AccommodationComponent } from './accommodation.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';

@NgModule({
  declarations: [
    AccommodationComponent,
    AccommodationOverviewComponent,
<<<<<<< HEAD
    AccommodationApproveComponent,
=======
    AccommodationDetailComponent,
>>>>>>> efa58c0f271cdb4c2dd398f0477ccd8a5c65b7ad
    AccommodationEditComponent,
    AccommodationComponent,
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
