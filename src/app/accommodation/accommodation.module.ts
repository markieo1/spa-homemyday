import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationService } from './accommodation.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AccommodationOverviewComponent
  ],
  imports: [
    BrowserModule,
    // TODO: Change in auth http
    HttpModule,
    AccommodationRoutingModule
  ],
  providers: [
    AccommodationService
  ],
  exports: []
})
export class AccommodationModule { }
