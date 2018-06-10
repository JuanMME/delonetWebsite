import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  serverUrl = 'http://localhost:3001/api' + '/sessions';

  constructor(private _http: HttpClient) {}

  login(loginData): Observable<any> {
    return this._http.post(this.serverUrl, loginData)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }
}
