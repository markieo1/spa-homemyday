import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { Accommodation } from '../accommodation.class';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-accommodation-create',
  templateUrl: 'accommodation-create.component.html'
})

export class AccommodationCreateComponent extends BaseComponent implements OnInit {

  /**
    * The accommodation form
    */
  public createAccommodationForm: FormGroup;
  /**
    * The accomodation model
    */
  public accomodation: Accommodation;

  /**
    * Determines if a submit is in progress
    */
  public submitInProgress: boolean;

  constructor(private accomodationService: AccommodationService, private router: Router, private alertService: AlertService) {
    super();
    this.accomodation = new Accommodation();
  }

  ngOnInit() {
    this.initForm();
  }

  public onSubmit() {

    if (!this.createAccommodationForm.valid) {
      return;
    }

    this.submitInProgress = true;

    this.subscription = this.accomodationService.createAccomodation(this.accomodation).subscribe((acco) => {
      this.alertService.showSuccess('Accommodation successfuly added.');
      this.submitInProgress = false;
      this.router.navigate(['/accommodations']);
    }, error => {
      console.log(error);
      this.submitInProgress = false;
      this.alertService.showError('An error has occurred while creating a new accommodation.');
    });
  }

  private initForm() {
    this.createAccommodationForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'maxPersons': new FormControl(0, Validators.required),
      'continent': new FormControl(''),
      'country': new FormControl(''),
      'location': new FormControl(''),
      'latitude': new FormControl(''),
      'longitude': new FormControl(''),
      'rooms': new FormControl(0),
      'beds': new FormControl(0),
      'price': new FormControl('0', Validators.required),
      'spaceText': new FormControl(''),
      'servicesText': new FormControl(''),
      'pricesText': new FormControl(''),
      'rulesText': new FormControl(''),
      'cancellationText': new FormControl('')
    });
  }
}
