import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {

  serverUrl = 'http://localhost:3001/api';

  constructor(private _http: HttpClient) {}

  /**
   * Devuelve el perfil del usuario logeado
   * @returns {any} profile
   */
  getProfile(): Observable<any> {
    let id;
    if ((id = localStorage.getItem('instructor_id'))) {
      return this._http.get(this.serverUrl + '/monitores/' + id)
      .map(res => this.prepareProfile(res, res['id_monitor'], 'monitores'))
      .catch(this.handleError);
    } else if ((id = localStorage.getItem('member_id'))) {
      return this._http.get(this.serverUrl + '/socios/' + id)
      .map(res => this.prepareProfile(res, res['id_socio'], 'socios'))
      .catch(this.handleError);
    }
  }

  /**
   * Mapea el perfil para devolverlo incluyendo los datos de id y tipo
   * @param profile
   * @param id contendrá el id del perfil
   * @param type contendrá la tabla de la que tenemos que operar
   * @returns {Profile} profile
   */
  prepareProfile(profile, id, type): Observable<any> {
    return Object.assign(profile, {id: id, type: type});
  }

  /**
   * Update a profile
   * @param monitor
   * @param id
   * @param type of a profile (socio = member, monitor = monitor )
   * @returns {any} affectedRows
   */
  updateProfile(profile: any, id, type): Observable<any> {
    return this._http.put(`${this.serverUrl}/${type}/${id}`, profile)
      .catch(this.handleError);
  }

  /**
   * Updatea la contraseña de un perfil
   * @param profile
   * @param id
   * @param type
   * @returns {any} affectedRows
   */
  updatePassword(profile: any, id, type): Observable<any> {
    Object.assign(profile, {type: type});
    return this._http.put(`${this.serverUrl}/password/${id}`, profile)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }


}
