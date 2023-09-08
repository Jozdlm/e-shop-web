import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { APP_ROUTES } from './app.routes';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey
);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore())
    ),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
