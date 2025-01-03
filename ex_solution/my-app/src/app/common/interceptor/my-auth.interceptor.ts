import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest }
  from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler)
    : Observable<HttpEvent<unknown>> {
    //NB: "access_token" plutot que "token" or "authToken" for angular-oauth2-oidc extension compatibility
    const token = sessionStorage.getItem('access_token');
    if(token && token!="" && token != "null"){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      console.log("MyAuthInterceptor , adding Bearer token="+token)
      return next.handle(authReq);
    }else
      return next.handle(req);
  }
}
