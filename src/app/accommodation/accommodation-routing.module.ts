import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';

const routes: Routes = [
  {
    path: 'accommodations',
    component: AccommodationDetailComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'accommodations/new',
    component: AccommodationCreateComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
