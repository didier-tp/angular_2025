import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MyStorageUtilService } from '../service/my-storage-util.service';

export const myAuthInterceptor: HttpInterceptorFn = (req, next) => {
  //NB: "access_token" plutot que "token" or "authToken" for angular-oauth2-oidc extension compatibility
  //const token = sessionStorage.getItem('access_token');
  const myStorageUtilService = inject(MyStorageUtilService);
  const token = myStorageUtilService.getItemInSessionStorage('access_token');
  if(token && token!="" && token != "null"){
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    console.log("MyAuthInterceptor , adding Bearer token="+token)
    return next(authReq);
  }else
    return next(req);
};
