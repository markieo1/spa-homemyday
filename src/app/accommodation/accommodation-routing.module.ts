import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationEditComponent } from './accommodation-edit/accommodation-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { AccommodationComponent } from './accommodation.component';

const routes: Routes = [
  {
    path: 'accommodations', component: AccommodationComponent, children: [
      { path: '', component: AccommodationOverviewComponent },
      { path: 'new', component: AccommodationEditComponent },
      { path: ':accommodationId/update', component: AccommodationEditComponent }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
