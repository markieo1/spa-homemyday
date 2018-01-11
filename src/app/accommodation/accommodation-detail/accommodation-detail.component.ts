import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: 'accommodation-detail.component.html',
})
export class AccommodationDetailComponent implements OnInit {

  constructor(private serviceAccommodation: AccommodationService) { }

  ngOnInit() {
    this.serviceAccommodation.getAccommodation('1');
  }

}
