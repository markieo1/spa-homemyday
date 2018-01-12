import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { Accommodation, ApproveStatus } from '../accommodation.class';
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
    // Load all the awaiting accommodations
    this.subscription = this.accommodationService.getAwaiting().subscribe(accommodations => {
      this.accommodations = accommodations;
    });
  }

  /**
  * Reject the clicked accommodation
  * @param accommodation The accommodation
  */
  onReject(accommodation: Accommodation) {
    this.alertService.showApprove()
      .then((confirmed) => {
        if (confirmed) {
          const rejectedAccommodation = accommodation;
          rejectedAccommodation.approveStatus.status = ApproveStatus.Rejected;
          rejectedAccommodation.approveStatus.reason = confirmed;
          this.subscription = this.accommodationService.update(rejectedAccommodation)
            .subscribe((resp) => {
              const index = this.accommodations.findIndex(x => x.id === accommodation.id);
              this.accommodations.splice(index, 1);
              this.alertService.showSuccess('Succesfully rejected accommodation');
            }, (error) => {
              this.alertService.showError('Error occurred while rejecting accommodation');
            });
        }
      });
  }

  /**
  * Approve the clicked accommodation
  * @param accommodation The accommodation
  */
  onApprove(accommodation: Accommodation) {
    this.alertService.showApprove()
      .then((confirmed) => {
        if (confirmed) {
          const approvedAccommodation = accommodation;
          approvedAccommodation.approveStatus.status = ApproveStatus.Approved;
          approvedAccommodation.approveStatus.reason = confirmed;
          this.subscription = this.accommodationService.update(approvedAccommodation)
            .subscribe((resp) => {
              const index = this.accommodations.findIndex(x => x.id === accommodation.id);
              this.accommodations.splice(index, 1);
              this.alertService.showSuccess('Succesfully approved accommodation');
            }, (error) => {
              this.alertService.showError('Error occurred while approving accommodation');
            });
        }
      });
  }
}
