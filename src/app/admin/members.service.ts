import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Member } from './models/member';

@Injectable()
export class MembersService {

  serverUrl = 'http://localhost:3001/api' + '/socios';

  constructor(private _http: HttpClient) {}

  /**
   * Devuelve todos los miembros existentes
   * @returns {Member[]} members
   */
  getMembers(): Observable<Member[]> {
    return this._http.get<Member[]>(this.serverUrl)
      .catch(this.handleError);
  }

  /**
   * Crea un nuevo miembro
   * @param member
   * @returns {any} affectedRows
   */
  createMember(member: any): Observable<any> {
    return this._http.post<any>(this.serverUrl, member)
      .catch(this.handleError);
  }

  /**
   * Modifica los datos de un miembro
   * @param memberId
   * @param member
   * @returns {any} affectedRows
   */
  modifyMember(memberId: Number, member: any): Observable<any> {
    return this._http.put(this.serverUrl + '/' + memberId, member)
      .catch(this.handleError);
  }

  /**
   * Borra un miembro de la base de datos
   * @param memberId
   * @returns {any} affectedRows
   */
  deleteMember(memberId: Number): Observable<any> {
    return this._http.delete(this.serverUrl + '/' + memberId)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }
}
