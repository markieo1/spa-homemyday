import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.class';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-accommodation-overview',
  templateUrl: 'accommodation-overview.component.html'
})
export class AccommodationOverviewComponent extends BaseComponent implements OnInit {
  /**
    * The accommodations to display
    */
  public accommodations: Accommodation[];

  constructor(private accommodationService: AccommodationService, private alertService: AlertService) {
    super();
  }

  public ngOnInit() {
    // Load all the accommodations
    this.subscription = this.accommodationService.getAll().subscribe(accommodations => {
      this.accommodations = accommodations;
    });
  }

  onAccommodationDeleteClick(id: string) {
    this.alertService.confirmAlert()
      .then((confirmed) => {
        if (confirmed) {
          this.accommodationService.delete(id)
          .subscribe((resp) => {
            const index = this.accommodations.findIndex(x => x.id === id);
            this.accommodations.splice(index, 1);
            this.alertService.showSuccessAlert('Succesfull', 'Succesfully removed accommodation');
          }, (error) => {
            this.alertService.showErrorAlert('Error', 'Error occurred while removing accommodation');
          });
        }
    });
  }
}
