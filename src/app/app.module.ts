import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { AccommodationModule } from './accommodation/accommodation.module';

import { AlertService } from './shared/services/alert.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NavigationModule,
    AccommodationModule,
    AppRoutingModule
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
