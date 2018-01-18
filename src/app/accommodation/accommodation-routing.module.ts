import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationEditComponent } from './accommodation-edit/accommodation-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { AccommodationApproveComponent } from './accommodation-approve/accommodation-approve.component';
import { AccommodationComponent } from './accommodation.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';

const routes: Routes = [
  {
    path: 'accommodations', component: AccommodationComponent, children: [
      { path: '', component: AccommodationOverviewComponent },
      { path: 'recommend', component: AccommodationOverviewComponent},
      { path: 'approve', component: AccommodationApproveComponent },
      { path: ':id', component: AccommodationDetailComponent },
      { path: 'edit/:accommodationId', component: AccommodationEditComponent },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
