import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { Accommodation } from '../accommodation.class';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: 'accommodation-edit.component.html'
})

export class AccommodationEditComponent extends BaseComponent implements OnInit {

  /**
    * The form of the accommodation
    */
  public accommodationForm: FormGroup;
  /**
    * The accommodation object
    */
  public accommodation: Accommodation;
  /**
    * The id of the accommodation if it is in editmode
    */
  public accommodationId: string;
  /**
    * The name of the component (New/Update Accommodations)
    */
  public name: string;
  /**
    * Determines if a submit is in progress
    */
  public submitInProgress: boolean;
  /**
    * Determines if the component is in edit mode
    */
  private editMode: boolean;

  constructor(private route: ActivatedRoute, private accomodationService: AccommodationService, private router: Router, private alertService: AlertService) {
    super();
    this.accommodation = new Accommodation();
  }

  ngOnInit() {
    this.initForm();
    this.name = 'New Accommodations';

    this.route.params
      .subscribe((params: Params) => {
        this.editMode = params['accommodationId'] != null;
        this.accommodationId = params['accommodationId'];
        if (this.accommodationId != null && this.accommodationId.length > 0) {
          this.accomodationService.get(this.accommodationId)
            .subscribe((accommodation: Accommodation) => {
              this.name = 'Update Accommodations';
              this.accommodation = accommodation;
              this.initForm(accommodation);
            });
        }
      });
  }

  /**
    * Saves a new or updated accommodation
    */
  public onSubmit() {
    if (!this.accommodationForm.valid) {
      return;
    }

    this.submitInProgress = true;

    if (!this.editMode) {
      this.accomodationService.create(this.accommodation).subscribe(() => {
        this.alertService.showSuccess('Accommodation successfully added.');
          this.submitInProgress = false;
          this.router.navigate(['/accommodations']);
      }, error => {
        this.submitInProgress = false;
        this.alertService.showError('An error has occurred while creating a new accommodation.');
      });
    } else {
      this.accomodationService.update(this.accommodation)
        .subscribe(() => {
          this.alertService.showSuccess('Accommodation successfully updated.');
          this.submitInProgress = false;
          this.router.navigate(['/accommodations']);
        }, error => {
          this.submitInProgress = false;
          this.alertService.showError('An error has occurred while updating the accommodation.');
        });
    }
  }

  /**
    * Initialize the accommodation form
    * @param accommodation The accommodation object
    */
  private initForm(accommodation?: Accommodation) {
      this.accommodationForm = new FormGroup({
        'name': new FormControl(accommodation ? accommodation.name : '', Validators.required),
        'description': new FormControl(accommodation ? accommodation.description : ''),
        'maxPersons': new FormControl(accommodation ? accommodation.maxPersons : 0, Validators.required),
        'continent': new FormControl(accommodation ? accommodation.continent : ''),
        'country': new FormControl(accommodation ? accommodation.country : ''),
        'location': new FormControl(accommodation ? accommodation.location : ''),
        'latitude': new FormControl(accommodation ? accommodation.latitude : ''),
        'longitude': new FormControl(accommodation ? accommodation.longitude : ''),
        'rooms': new FormControl(accommodation ? accommodation.rooms : 0),
        'beds': new FormControl(accommodation ? accommodation.beds : 0),
        'price': new FormControl(accommodation ? accommodation.price : '0', Validators.required),
        'spaceText': new FormControl(accommodation ? accommodation.spaceText : ''),
        'servicesText': new FormControl(accommodation ? accommodation.servicesText : ''),
        'pricesText': new FormControl(accommodation ? accommodation.pricesText : ''),
        'rulesText': new FormControl(accommodation ? accommodation.rulesText : ''),
        'cancellationText': new FormControl(accommodation ? accommodation.cancellationText : '')
      });
  }
}
