import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';

const routes: Routes = [
  {
    path: 'accommodations',
    component: AccommodationOverviewComponent,
  },
  {
    path: 'accommodations/new',
    component: AccommodationCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
