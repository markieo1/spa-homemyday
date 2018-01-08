import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.class';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-accommodation-overview',
  templateUrl: 'accommodation-overview.component.html'
})
export class AccommodationOverviewComponent extends BaseComponent implements OnInit {
  /**
   * The accommodations to display
   */
  public accommodations: Accommodation[];

  constructor(private accommodationService: AccommodationService) {
    super();
  }

  public ngOnInit() {
    // Load all the accommodations
    this.subscription = this.accommodationService.getAll().subscribe(accommodations => {
      this.accommodations = accommodations;
    });
  }
}
