import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {USERS_API_URL, LOGIN_API_URL} from '../constants/api';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  
  constructor(private http: Http) { }

  public register(user): Observable<any> {
    return this.http.post(USERS_API_URL, JSON.stringify(user), this.options);
  }

  public login(credentials): Observable<any> {
    return this.http.post(LOGIN_API_URL, JSON.stringify(credentials), this.options);
  }

  public getUser(user): Observable<any> {
    return this.http.get(`${USERS_API_URL}/${user._id}`).map(res => res.json());
  }

}
