import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { Accommodation } from '../accommodation.class';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-accommodation-create',
  templateUrl: 'accommodation-create.component.html'
})

export class AccommodationCreateComponent extends BaseComponent implements OnInit {

  public createAccommodationtForm: FormGroup;

  constructor(private accomodationService: AccommodationService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  public onSubmit() {

  }

  private initForm() {
    this.createAccommodationtForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'maxPersons': new FormControl(0, Validators.required),
      'continent': new FormControl(''),
      'country': new FormControl(''),
      'location': new FormControl(''),
      'latitude': new FormControl(''),
      'longtitude': new FormControl(''),
      'rooms': new FormControl(0),
      'beds': new FormControl(0),
      'price': new FormControl('0'),
      'spaceText': new FormControl(''),
      'servicesText': new FormControl(''),
      'pricesText': new FormControl(''),
      'rulesText': new FormControl(''),
      'cancellationText': new FormControl('')
    });
  }
}
