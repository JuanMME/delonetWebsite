import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class MembersService {

  serverUrl = 'http://localhost:3001/api' + '/socios';

  constructor(private _http: HttpClient) {}

  getMembers(): Observable<any> {
    return this._http.get(this.serverUrl)
      .catch(this.handleError);
  }

  createMember(member: any) {
    return this._http.post(this.serverUrl, member)
      .catch(this.handleError);
  }

  modifyMember(memberId: Number, member: any) {
    return this._http.put(this.serverUrl + '/' + memberId, member)
      .catch(this.handleError);
  }

  deleteMember(memberId: Number) {
    return this._http.delete(this.serverUrl + '/' + memberId)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error status code' + error.status + 'status' + error.statusText + ' at ' + error.url;
    return Observable.throw(msg);
  }
}
