import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptionsArgs } from '@angular/http';
import { Accommodation, ApproveStatus } from './accommodation.class';
import { HttpHelper } from '../shared/helpers/http.helper';
import { AuthHttp } from 'angular2-jwt';
import '../shared/operators/to-typescript-object.operator';

@Injectable()
export class AccommodationService {

  constructor(protected authHttp: AuthHttp) { }

  /**
    * Gets all the accommodations
    */
  public getAll(): Observable<Accommodation[]> {
    return this.authHttp.get(`${environment.apiUrl}/accommodations`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .arrayToTypescriptObject(Accommodation);
  }

  /**
    * Gets all awaiting the accommodations
    */
  public getAwaiting(): Observable<Accommodation[]> {
    return this.authHttp.get(`${environment.apiUrl}/accommodations/awaiting`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .arrayToTypescriptObject(Accommodation);
  }

  public getAccommodation(id: string): Observable<Accommodation> {
    return this.authHttp.get(`${environment.apiUrl}/accommodations/${id}`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .map(r => new Accommodation(r));
  }

  /**
    * Gets an accommodation of the id
    * @param id The id of the accommodation
    */
  public get(id: string): Observable<Accommodation> {
    return this.authHttp.get(`${environment.apiUrl}/accommodations/${id}`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .map(r => new Accommodation(r));
  }

  /**
    * Adds a new accomodation
    * @param accommodation The object of the accommodation
    */
  public create(accommodation: Accommodation): Observable<Accommodation> {
    return this.authHttp.post(`${environment.apiUrl}/accommodations`, accommodation, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .map(r => new Accommodation(r));
  }

  /**
    * Updates an accommodation
    * @param accommodation The object of the accommodation
    */
  public update(accommodation: Accommodation): Observable<Accommodation> {
    return this.authHttp.put(`${environment.apiUrl}/accommodations/${accommodation.id}`, accommodation, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .map(r => new Accommodation(r));
  }

  public updateApproval(accommodationId: string, status: ApproveStatus, reason?: string): Observable<Accommodation> {
    const body = {
      status,
      reason
    };

    return this.authHttp.put(`${environment.apiUrl}/accommodations/${accommodationId}/approval`, body, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .map(r => new Accommodation(r));
  }

  /**
    * recommends an accommodation
    * @param accommodation The object of the accommodation
    */
  public updateRecommend(accommodationId: string, recommended: boolean): Observable<Accommodation> {
    const body = {
      recommended
    };

    return this.authHttp.put(`${environment.apiUrl}/accommodations/${accommodationId}/recommendation`, body, HttpHelper.getRequestOptions())
    .map(r => r.json())
    .map(r => new Accommodation(r));
  }

  /**
    * Deletes an accommodation of the id
    * @param id The id of the accommodation
    */
  public delete(id: string) {
    return this.authHttp.delete(`${environment.apiUrl}/accommodations/${id}`, HttpHelper.getRequestOptions())
      .map(r => r.json());
  }

  /**
    * Gets the accommodations for the current user
    */
  public getForCurrentUser(): Observable<Accommodation[]> {
    return this.authHttp.get(`${environment.apiUrl}/accommodations/me`, HttpHelper.getRequestOptions())
      .map(r => r.json())
      .arrayToTypescriptObject(Accommodation);
  }

  /**
   * Removes an image from the accommodation
   * @param accommodationId The accommodation id to remove the image from
   * @param imageId The id of the image
   */
  public removeImage(accommodationId: string, imageId: string) {
    return this.authHttp.delete(`${environment.apiUrl}/accommodations/${accommodationId}/images/${imageId}`, HttpHelper.getRequestOptions())
      .map(r => r.json());
  }
}
