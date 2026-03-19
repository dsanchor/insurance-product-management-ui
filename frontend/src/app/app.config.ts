import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { setRuntimeConfig } from './runtime-config';

import { routes } from './app.routes';

function initializeApp(): () => Promise<void> {
  return () =>
    fetch('runtime-config.json')
      .then((res) => (res.ok ? res.json() : Promise.reject('Failed to load runtime config')))
      .then((config) => setRuntimeConfig(config))
      .catch(() => console.warn('runtime-config.json not found, using defaults'));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
};
