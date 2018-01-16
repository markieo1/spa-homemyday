import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Accommodation } from '../accommodation.class';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AlertService } from '../../alert/alert.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: 'accommodation-detail.component.html',
})
export class AccommodationDetailComponent extends BaseComponent implements OnInit, OnDestroy {
  public accommodation: Accommodation;

  public apiUrl = environment.apiUrl;

  constructor(private serviceAccommodation: AccommodationService,
              private serviceAlert: AlertService,
              private aRoute: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription = this.aRoute.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.serviceAccommodation.getAccommodation(id).subscribe(
          (acco: Accommodation) => {
            this.accommodation = acco;
          }, (error) => {
            this.serviceAlert.showError('An error has occurred while viewing a existing accommodation.');
            this.backToOverview();
        });
      }
    );
  }

  public backToOverview(): void {
    this.router.navigate(['/accommodations']);
  }
}
