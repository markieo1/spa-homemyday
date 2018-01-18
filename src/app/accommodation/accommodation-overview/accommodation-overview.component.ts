import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.class';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from '../../auth/auth.service';
import { UserRoles } from '../../shared/enums/userroles.enum';

@Component({
  selector: 'app-accommodation-overview',
  templateUrl: 'accommodation-overview.component.html'
})
export class AccommodationOverviewComponent extends BaseComponent implements OnInit {
  /**
    * The accommodations to display
    */
  public accommodations: Accommodation[];

  /**
    * The accommodation object
    */
  public accommodation: Accommodation;

  /**
    * The admin property to check if user is admin
    */
  public admin: boolean;

  constructor(private accommodationService: AccommodationService,
              private alertService: AlertService,
              private authService: AuthService) {
    super();
    const userInfo = authService.getUserInfo();

    if (userInfo.role === UserRoles.Administrator) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  public ngOnInit() {
    // Load all the accommodations if admin is logged in
    // else load the accommodations from the current user
    if (this.admin) {
      this.subscription = this.accommodationService.getAll().subscribe(accommodations => {
        this.accommodations = accommodations;
      });
    } else {
      this.subscription = this.accommodationService.getForCurrentUser().subscribe(accommodations => {
        this.accommodations = accommodations;
      });
    }
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

  onAccomodationRecommendedClick(accommodation: Accommodation) {
    this.alertService.showConfirm()
    .then((response) => {
      if (response) {
        const recommendAccommodation = accommodation;
        recommendAccommodation.recommended = true;
        const value = recommendAccommodation.recommended;

        this.subscription = this.accommodationService.updateRecommend(recommendAccommodation.id, value)
        .subscribe((resp) => {
          this.alertService.showSuccess('Succesfully recommend accommodation');
        }, (error) => {
            this.alertService.showError('Error occurred while recommendad accomodation');
        });
      }
    });
  }

  onAccomodationDoNotRecommendedClick(accommodation: Accommodation) {
    this.alertService.showConfirm()
    .then((response) => {
      if (response) {
        const recommendAccommodation = accommodation;
        recommendAccommodation.recommended = false;
        const value =  recommendAccommodation.recommended;

        this.subscription = this.accommodationService.updateRecommend(recommendAccommodation.id, value)
        .subscribe((resp) => {
          this.alertService.showSuccess('Succesfully undo your change');
        }, (error) => {
            this.alertService.showError('Error occurred undo your changes');
        });
      }
    });
  }
}
