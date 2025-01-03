import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Devise } from '../data/devise';
import { Login, LoginResponse } from '../data/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //baseUrl = "https://www.d-defrance.fr/tp/standalone-login-api/v1/public";
  baseUrl = "/tp/standalone-login-api/v1/public"; //url incomplete possible via proxy.conf.json 
  // reverse proxy de ng serve

  constructor(private http: HttpClient){
  }
 
   public postLogin$(loginRequest : Login) : Observable<LoginResponse>{
      let url = this.baseUrl + "/auth";
      return this.http.post<LoginResponse>(url,loginRequest);
   }
}
