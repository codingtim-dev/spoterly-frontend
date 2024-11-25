import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import {authInterceptor} from './core/auth/interceptors/authInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor]), withInterceptorsFromDi()),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideAngularSvgIcon(),
  ],
};

