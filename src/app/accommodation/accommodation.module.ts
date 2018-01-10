import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationService } from './accommodation.service';
import { HttpModule } from '@angular/http';
import { AlertModule } from '../alert/alert.module';
import { AuthModule } from '../auth/auth.module';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';

@NgModule({
  declarations: [
    AccommodationOverviewComponent,
    AccommodationDetailComponent
  ],
  imports: [
    BrowserModule,
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
