import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Class } from './models/class';
@Injectable()
export class ClassService {

  serverUrl = 'http://localhost:3001/api' + '/clases';

  constructor(private _http: HttpClient) {}

  /**
   * Devuelve todas las clases
   * @returns {Class[]} clases
   */
  getClasses(): Observable<Class[]> {
    return this._http.get<Class[]>(this.serverUrl)
      .catch(this.handleError);
  }

  /**
   * Devuelve los socios de una clase concreta
   * @param id_clase
   * @returns {Class} clase
   */
  getClassMembers(id_clase): Observable<Class[]> {
    return this._http.get<Class[]>(this.serverUrl + '-socios/' + id_clase)
      .catch(this.handleError);
  }

  /**
   * Devuelve una clase concreta
   * @param id_clase
   * @returns {Class} clase
   */
  getClass(id_clase): Observable<Class> {
    return this._http.get<Class>(this.serverUrl + '/' + id_clase)
      .catch(this.handleError);
  }

  /**
   * Crea una nueva clase
   * @param classe
   * @returns {any} affectedRows
   */
  createClases(classe: any): Observable<any> {
    return this._http.post<any>(this.serverUrl, classe)
      .catch(this.handleError);
  }

  /**
   * Modifica cualquier dato o todos de una clase
   * @param classId
   * @param classe
   * @returns {any} affectedRows
   */
  modifyClass(classId: Number, classe: any): Observable<any> {
    return this._http.put<any>(this.serverUrl + '/' + classId, classe)
      .catch(this.handleError);
  }

  /**
   * Borra una clase
   * @param classId
   * @returns {any} affectedRows
   */
  deleteClass(classId: Number): Observable<any> {
    return this._http.delete(this.serverUrl + '/' + classId)
      .catch(this.handleError);
  }

  /**
   * Devuelve aquellos miembros que no están asociados a una clase
   * @param id_clase
   * @returns {Members[]} members
   */
  getNotMembersInClass(id_clase): Observable<any> {
    return this._http.get(this.serverUrl + '/' + id_clase + '/add-member')
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }

}
