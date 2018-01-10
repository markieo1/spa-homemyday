import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Accommodation } from './accommodation.class';
import { HttpHelper } from '../shared/helpers/http.helper';
import { EventEmitter } from '@angular/core/src/event_emitter';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AccommodationService {

  public onAddAccomodation: Subject<Accommodation>;
  public onUpdateAccommodation: Subject<Accommodation>;

  // TODO: Replace HTTP with AuthHttp
  constructor(protected http: Http) {
    this.onAddAccomodation = new Subject<Accommodation>();
  }

  /**
    * Gets all the accommodations
    */
  public getAll(): Observable<Accommodation[]> {
    return this.http.get(`${environment.apiUrl}/accommodations`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .flatMap(r => r)
      .map(r => new Accommodation(r))
      .toArray();
  }

  /**
   * Gets an accommodation of the id
   * @param id The id of the accommodation
   */
  public get(id: string): Observable<Accommodation> {
    return this.http.get(`${environment.apiUrl}/accommodations/${id}`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .map(r => new Accommodation(r));
  }

  /**
  * Adds a new accomodation
  * @param accommodation The object of the accommodation
  */
  public create(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.post(`${environment.apiUrl}/accommodations`, accommodation)
      .map(r => r.json());
  }

  /**
   * Updates an accommodation
   * @param accommodation The object of the accommodation
   */
  public update(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.put(`${environment.apiUrl}/accommodations`, accommodation)
      .map(r => r.json());
  }

  /**
    * Deletes an accommodation of the id
    * @param id The id of the accommodation
    */
  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/accommodations/${id}`, HttpHelper.getRequestOptions())
      .map(r => r.json());
  }
}
