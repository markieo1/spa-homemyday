import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Accommodation } from '../accommodation.class';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: 'accommodation-detail.component.html',
})
export class AccommodationDetailComponent implements OnInit, OnDestroy {
  public name: string;
  public description: string;
  public maxPersons: number;
  public rooms: number;
  public beds: number;
  public continent: string;
  public country: string;
  public location: string;
  public price: string;
  private subs: Subscription[] = [
    new Subscription()
  ];

  constructor(private serviceAccommodation: AccommodationService,
              private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subs[0] = this.aRoute.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.serviceAccommodation.getAccommodation(id).subscribe(
          (accommodation: Accommodation) => {
            this.name = accommodation.name;
            this.description = accommodation.description;
            this.maxPersons = accommodation.maxPersons;
            this.rooms = accommodation.rooms;
            this.beds = accommodation.beds;
            this.continent = accommodation.continent;
            this.country = accommodation.country;
            this.location = accommodation.location;
            this.price = accommodation.price;
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subs[0].unsubscribe();
  }

}
