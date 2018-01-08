import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationComponent } from './navigation.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [],
  exports: [NavigationComponent]
})
export class NavigationModule { }
