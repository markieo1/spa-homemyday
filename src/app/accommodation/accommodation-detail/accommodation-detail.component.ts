import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Accommodation } from '../accommodation.class';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { AlertService } from '../../alert/alert.service';
import { environment } from '../../../environments/environment';
import { Image } from '../../image/image.class';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: 'accommodation-detail.component.html',
  styleUrls: ['accommodation-detail.component.scss']
})
export class AccommodationDetailComponent extends BaseComponent implements OnInit {
  public accommodation: Accommodation;

  constructor(private serviceAccommodation: AccommodationService,
    private serviceAlert: AlertService,
    private aRoute: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription = this.aRoute.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.serviceAccommodation.getAccommodation(id).subscribe(
          (acco: Accommodation) => {
            this.accommodation = acco;
          }, (error) => {
            this.serviceAlert.showError('An error has occurred while viewing a existing accommodation.');
            this.backToOverview();
          });
      }
    );
  }

  /**
   * Gets an image url for the specified image
   * @param image The image object to get the url for
   */
  public getImageUrl(image: Image): string {
    return `${environment.apiUrl}images/${image.filename}`;
  }

  /**
   * Redirects the user to the accommodation overview
   */
  public backToOverview(): void {
    this.router.navigate(['/accommodations']);
  }
}
