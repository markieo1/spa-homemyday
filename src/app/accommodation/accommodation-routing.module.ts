import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'accommodations',
    component: AccommodationOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accommodations/new',
    component: AccommodationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accommodations/:accommodationId',
    component: AccommodationComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
