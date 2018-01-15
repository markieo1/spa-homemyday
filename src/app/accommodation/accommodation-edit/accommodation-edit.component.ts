import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AccommodationService } from '../accommodation.service';
import { Accommodation } from '../accommodation.class';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import { Location } from '@angular/common';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from '../../../environments/environment';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';

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
    * Determines if the component is new
    */
  public isNew: boolean;

  /**
    * Determines if a submit is in progress
    */
  public submitInProgress: boolean;

  /**
    * The config used for dropzone
    */
  public dropzoneConfig: DropzoneConfigInterface;

  @ViewChild(DropzoneComponent)
  public dropzoneComponent: DropzoneComponent;

  constructor(private location: Location,
    private route: ActivatedRoute,
    private accomodationService: AccommodationService,
    private router: Router,
    private alertService: AlertService) {
    super();
    this.accommodation = new Accommodation();
  }

  ngOnInit() {
    this.initForm();

    this.route.params
      .subscribe((params: Params) => {
        const accommodationId = params.accommodationId;

        if (accommodationId === 'new') {
          this.isNew = true;
          this.accommodation = new Accommodation();
        } else {
          this.isNew = false;
          this.accommodationId = params['accommodationId'];
          if (this.accommodationId) {
            this.accomodationService.get(this.accommodationId)
              .subscribe((accommodation: Accommodation) => {
                this.accommodation = accommodation;
                this.fillForm(accommodation);
                this.fillAlreadyUploadedImages();
              }, error => {
                this.alertService.showError('An error has occurred while retrieving the accommodation.');
                this.location.back();
              });

            this.dropzoneConfig = {
              url: `${environment.apiUrl}/accommodations/${this.accommodationId}/images`,
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            };
          }
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

    if (this.isNew) {
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
    * Called when the upload has an error
    */
  public onUploadError($event) {
    this.alertService.showError($event[1].error);
  }

  /**
    * Sets the value of the accommodation form
    * @param accommodation The object of accommodation
    */
  private fillForm(accommodation: Accommodation) {
    this.accommodationForm.setValue({
      'name': accommodation.name || '',
      'description': accommodation.description || '',
      'maxPersons': accommodation.maxPersons || 0,
      'continent': accommodation.continent || '',
      'country': accommodation.country || '',
      'location': accommodation.location || '',
      'latitude': accommodation.latitude || '',
      'longitude': accommodation.longitude || '',
      'rooms': accommodation.rooms || 0,
      'beds': accommodation.beds || 0,
      'price': accommodation.price || '',
      'spaceText': accommodation.spaceText || '',
      'servicesText': accommodation.servicesText || '',
      'pricesText': accommodation.pricesText || '',
      'rulesText': accommodation.rulesText || '',
      'cancellationText': accommodation.cancellationText || ''
    });
  }

  /**
    * Initialize the accommodation form
    * @param accommodation The accommodation object
    */
  private initForm() {
    this.accommodationForm = new FormGroup({
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

  /**
    * Fill the already uploaded images
    */
  private fillAlreadyUploadedImages() {
    if (!this.accommodation || !this.accommodation.images) {
      return;
    }

    const dropzone = this.dropzoneComponent.directiveRef.dropzone();
    this.accommodation.images.forEach(image => {
      // Create the mock file
      const lastSlashIndex = image.lastIndexOf('/');
      const fileName = image.substring(lastSlashIndex + 1);
      const mockFile = { name: fileName, size: 0, url: image };

      // Call the default addedfile event handler
      dropzone.emit('addedfile', mockFile);

      // Or if the file on your server is not yet in the right
      // size, you can let Dropzone download and resize it
      // callback and crossOrigin are optional.
      dropzone.createThumbnailFromUrl(mockFile, image);

      dropzone.emit('complete', mockFile);
    });
  }
}
