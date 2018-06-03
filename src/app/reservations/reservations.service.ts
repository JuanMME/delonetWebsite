import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReservationsService {

  serverUrl = 'http://localhost:3001/api' + '/reservas';

  constructor(private _http: HttpClient) {}

  getReservations(): Observable<any> {
    return this._http.get(this.serverUrl)
      .catch(this.handleError);
  }

  createReservation(reservation: any): Observable<any> {
    return this._http.post(this.serverUrl, reservation)
      .catch(this.handleError);
  }

  getClasses(): Observable<any> {
    return this._http.get('http://localhost:3001/api/clases')
      .catch(this.handleError);
  }

  getClass(id_clase): Observable<any> {
    return this._http.get(`http://localhost:3001/api/clases/${id_clase}`)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }
}
