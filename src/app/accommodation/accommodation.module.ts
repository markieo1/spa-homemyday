import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationService } from './accommodation.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AlertModule } from '../alert/alert.module';

@NgModule({
  declarations: [
    AccommodationOverviewComponent,
    AccommodationCreateComponent
  ],
  imports: [
    BrowserModule,
    // TODO: Change in auth http
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AccommodationRoutingModule,
    AlertModule
  ],
  providers: [
    AccommodationService
  ],
  exports: []
})
export class AccommodationModule { }
