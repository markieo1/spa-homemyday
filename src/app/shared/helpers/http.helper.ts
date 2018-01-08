import { RequestOptionsArgs, Headers } from '@angular/http';

export class HttpHelper {
  /**
   * Gets the request options to use in an HTTP request
   */
  public static getRequestOptions(): RequestOptionsArgs {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return {
      headers: headers
    };
  }
}
