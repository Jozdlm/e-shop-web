import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { APP_ROUTES } from './app/app.routes';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
