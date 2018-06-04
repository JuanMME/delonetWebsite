import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
@Injectable()
export class ClassService {

  serverUrl = 'http://localhost:3001/api' + '/clases';

  constructor(private _http: HttpClient) {}

  getClasses(): Observable<any> {
    return this._http.get(this.serverUrl)
      .catch(this.handleError);
  }

  createClases(classe: any) {
    return this._http.post(this.serverUrl, classe)
      .catch(this.handleError);
  }

  modifyClass(classId: Number, classe: any) {
    return this._http.put(this.serverUrl + '/' + classId, classe)
      .catch(this.handleError);
  }

  deleteClass(classId: Number) {
    return this._http.delete(this.serverUrl + '/' + classId)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }

}
