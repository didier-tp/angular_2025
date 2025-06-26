import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const router = inject(Router);
let token = sessionStorage.getItem('access_token');
if(token != "" && token != null && token != "null")
return true;
else
//return false;
return router.parseUrl('/ngr-login');
//return router.parseUrl('/ngr-not-authorized');
};
