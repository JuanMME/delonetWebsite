import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class MonitorService {

  serverUrl = 'http://localhost:3001/api' + '/monitores';

  constructor(private _http: HttpClient) {}

  getMonitors(): Observable<any> {
    return this._http.get(this.serverUrl)
      .catch(this.handleError);
  }

  createMonitor(monitor: any) {
    return this._http.post(this.serverUrl, monitor)
      .catch(this.handleError);
  }

  modifyMonitor(monitorId: Number, monitor: any) {
    return this._http.put(this.serverUrl + '/' + monitorId, monitor)
      .catch(this.handleError);
  }

  deleteMonitor(monitorId: Number) {
    return this._http.delete(this.serverUrl + '/' + monitorId)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }

}
