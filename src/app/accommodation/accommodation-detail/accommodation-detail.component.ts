import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Accommodation } from '../accommodation.class';
import { BaseComponent } from '../../shared/base/basecomponent.class';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: 'accommodation-detail.component.html',
})
export class AccommodationDetailComponent extends BaseComponent implements OnInit, OnDestroy {
  public accommodation: Accommodation;

  constructor(private serviceAccommodation: AccommodationService,
              private aRoute: ActivatedRoute) {
    super();
 }

  ngOnInit() {
    this.subscription = this.aRoute.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.serviceAccommodation.getAccommodation(id).subscribe(
          (accommodation: Accommodation) => {
            this.accommodation = accommodation;
          }
        );
      }
    );
  }
}
