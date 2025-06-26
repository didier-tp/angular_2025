import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginResponse } from '../data/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl="https://www.d-defrance.fr/tp/standalone-login-api/v1"
  //ou bien  baseUrl="tp/standalone-login-api/v1" si proxy.conf.json

  constructor(private _http: HttpClient) { }

  public postLogin$(login: Login): Observable<LoginResponse>{
    let url = this.baseUrl + "/public/auth" 
    return this._http.post<LoginResponse>(url,login)
  }
}
