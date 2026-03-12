

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let token = sessionStorage.getItem('access_token');
  if (token !=null && token != "" && token != "null")
    return true;
  else
    //return false;
    return router.parseUrl('/ngr-login');//ou bien /ngr-unauthorized ou autre
};