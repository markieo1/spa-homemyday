import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../shared/helpers/http.helper';
import { IOtpModel } from './otp/iotpmodel.class';

@Injectable()
export class TwofactorService {
  constructor(protected authHttp: AuthHttp) {}

  /**
   * Gets the details for otp
   */
  public getDetails(): Observable<IOtpModel> {
    return this.authHttp
      .get(
        `${environment.apiUrl}/twofactor/setup`,
        HttpHelper.getRequestOptions()
      )
      .map(r => r.json());
  }

  /**
   * Setups the OTP
   */
  public setup(): Observable<IOtpModel> {
    return this.authHttp
      .post(
        `${environment.apiUrl}/twofactor/setup`,
        {},
        HttpHelper.getRequestOptions()
      )
      .map(r => r.json());
  }

  /**
   * Disables two factor auth
   */
  public disable(): Observable<boolean> {
    return this.authHttp
      .delete(
        `${environment.apiUrl}/twofactor/setup`,
        HttpHelper.getRequestOptions()
      )
      .map(r => r.json())
      .map(r => r.success);
  }

  /**
   * Confirms the OTP
   * @param otp The otp
   */
  public confirm(otp: string) {
    return this.authHttp
      .post(
        `${environment.apiUrl}/twofactor/verify`,
        {
          token: otp
        },
        HttpHelper.getRequestOptions()
      )
      .map(r => r.json())
      .map(r => r.success);
  }
}
