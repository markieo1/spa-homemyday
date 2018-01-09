import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [],
  exports: [NavigationComponent]
})
export class NavigationModule { }
