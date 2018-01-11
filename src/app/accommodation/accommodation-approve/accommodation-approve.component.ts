import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { Accommodation } from '../accommodation.class';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-accommodation-approve',
  templateUrl: 'accommodation-approve.component.html'
})
export class AccommodationApproveComponent extends BaseComponent implements OnInit {

  constructor(private accommodationService: AccommodationService, private alertService: AlertService) {
    super();
  }

  /**
 * The accommodations to display
 */
  public accommodations: Accommodation[];

  ngOnInit() {
    // Load all the accommodations
    this.subscription = this.accommodationService.getAll().subscribe(accommodations => {
      this.accommodations = accommodations.filter(accommodation => accommodation.approveStatus.status === 'Awaiting');
    });
  }

  /**
  * Reject the clicked accommodation
  * @param id The id of the accommodation
  */
  onReject(id: string) {
    this.alertService.showConfirm()
      .then((confirmed) => {
        if (confirmed) {
          this.subscription = this.accommodationService.delete(id)
            .subscribe((resp) => {
              // const index = this.accommodations.findIndex(x => x.id === id);
              // this.accommodations.splice(index, 1);
              this.alertService.showSuccess('Succesfully rejected accommodation');
            }, (error) => {
              this.alertService.showError('Error occurred while rejecting accommodation');
            });
        }
      });
  }

  /**
  * Approve the clicked accommodation
  * @param id The id of the accommodation
  */
  onApprove(id: string) {
    this.alertService.showConfirm()
      .then((confirmed) => {
        if (confirmed) {
          this.subscription = this.accommodationService.delete(id)
            .subscribe((resp) => {
              // const index = this.accommodations.findIndex(x => x.id === id);
              // this.accommodations.splice(index, 1);
              this.alertService.showSuccess('Succesfully approved accommodation');
            }, (error) => {
              this.alertService.showError('Error occurred while approving accommodation');
            });
        }
      });
  }
}
