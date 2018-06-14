import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class LoginService {

  serverUrl = 'http://localhost:3001/api' + '/sessions';

  constructor(private _http: HttpClient) {}

  /**
   * Envia a la base de datos un email y una contraseña
   * para logearse en la pagina
   * @param loginData
   * @returns {boolean} valid
   */
  login(loginData): Observable<any> {
    loginData.password = Md5.hashStr(loginData.password);
    return this._http.post(this.serverUrl, loginData)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }
}
