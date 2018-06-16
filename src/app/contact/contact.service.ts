import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactService {

  serverUrl = 'http://localhost:3001/api' + '/contact';

  constructor(private _http: HttpClient) {}

  sendContactForm(data): Observable<any> {
    return this._http.post(this.serverUrl, data)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }
}
