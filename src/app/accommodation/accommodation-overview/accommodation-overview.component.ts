import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.class';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-accommodation-overview',
  templateUrl: 'accommodation-overview.component.html'
})
export class AccommodationOverviewComponent extends BaseComponent implements OnInit {
  /**
    * The accommodations to display
    */
  public accommodations: Accommodation[];

  constructor(private accommodationService: AccommodationService,
              private alertService: AlertService) {
    super();
  }

  public ngOnInit() {
    // Load all the accommodations
    this.subscription = this.accommodationService.getAll().subscribe(accommodations => {
      this.accommodations = accommodations;
    });
  }

  /**
    * Deletes the clicked accommodation
    * @param id The id of the accommodation
    */
  onAccommodationDeleteClick(id: string) {
    this.alertService.showConfirm()
      .then((confirmed) => {
        if (confirmed) {
          this.subscription = this.accommodationService.delete(id)
            .subscribe((resp) => {
              const index = this.accommodations.findIndex(x => x.id === id);
              this.accommodations.splice(index, 1);
              this.alertService.showSuccess('Succesfully removed accommodation');
            }, (error) => {
              this.alertService.showError('Error occurred while removing accommodation');
            });
        }
      });
  }
}
