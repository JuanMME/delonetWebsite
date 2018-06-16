import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Monitor } from './models/monitor';

@Injectable()
export class MonitorService {

  serverUrl = 'http://localhost:3001/api' + '/monitores';
  serverUrl_v2 = 'http://localhost:3001/api' + '/usuarios';

  constructor(private _http: HttpClient) {}

  /**
   * Devuelve todos los monitores existentes
   * @returns {Monitor[]} monitors
   */
  getMonitors(): Observable<Monitor[]> {
    return this._http.get<Monitor[]>(this.serverUrl)
      .catch(this.handleError);
  }

  /**
   * Crea un nuevo monitor
   * @param monitor
   * @returns {any} affectedRows
   */
  createMonitor(monitor: any): Observable<any> {
    return this._http.post(this.serverUrl, monitor)
      .catch(this.handleError);
  }

  /**
   * Modifica los datos de un monitor
   * @param monitorId
   * @param monitor
   * @returns {any} affectedRows
   */
  modifyMonitor(monitorId: Number, monitor: any): Observable<any> {
    return this._http.put(this.serverUrl + '/' + monitorId, monitor)
      .catch(this.handleError);
  }

  /**
   * Borra un monitor de la base de datos
   * @param monitorId
   * @returns {any} affectedRows
   */
  deleteMonitor(monitorId: Number): Observable<any> {
    return this._http.delete<any>(this.serverUrl + '/' + monitorId)
      .catch(this.handleError);
  }

  /**
   * Comprueba que el email no está siendo usado por ningún otro usuario
   * @param email
   * @returns {boolean} invalid
   */
  checkEmail(email: string): Observable<any> {
    return this._http.get<any>(this.serverUrl_v2 + '/check-email', {
      params: {
        email: email
      }
    })
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }

}
