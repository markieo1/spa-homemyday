import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationEditComponent } from './accommodation-edit/accommodation-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'accommodations',
    component: AccommodationOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accommodations/new',
    component: AccommodationEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accommodations/:accommodationId',
    component: AccommodationEditComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
