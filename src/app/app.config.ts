import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFileRouter } from '@analogjs/router';
import { withComponentInputBinding } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const environment = {
  firebase: {
    projectId: import.meta.env['VITE_PROJECT_ID'],
    appId: import.meta.env['VITE_APP_ID'],
    storageBucket: import.meta.env['VITE_STORAGE_BUCKET'],
    apiKey: import.meta.env['VITE_API_KEY'],
    authDomain: import.meta.env['VITE_AUTH_DOMAIN'],
    messagingSenderId: import.meta.env['VITE_MESSAGING_SENDER_ID'],
    measurementId: import.meta.env['VITE_MEASUREMENT_ID'],
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(withComponentInputBinding()),
    provideHttpClient(),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
