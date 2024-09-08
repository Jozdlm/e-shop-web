import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { environment } from 'src/environments/environment';
import { APP_ROUTES } from './routes/app.routes';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey
);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
