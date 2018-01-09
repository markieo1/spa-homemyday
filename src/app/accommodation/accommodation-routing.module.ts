import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';

const routes: Routes = [
  {
    path: 'accommodations',
    component: AccommodationOverviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
