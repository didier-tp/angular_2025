import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { myAuthInterceptor } from './common/interceptor/my-auth.interceptor';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [ provideZoneChangeDetection({ eventCoalescing: true }),
               provideRouter(routes), provideClientHydration(),
               provideHttpClient(withInterceptors([myAuthInterceptor])),
               provideOAuthClient()]
};
