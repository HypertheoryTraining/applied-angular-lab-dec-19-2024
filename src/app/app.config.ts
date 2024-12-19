import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { FeaturesService } from '@shared';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    //provideExperimentalZonelessChangeDetection(),
    FeaturesService,
    provideHttpClient(), // TODO: Talk about this.
    provideRouter(
      routes,
      withComponentInputBinding(),
      // withViewTransitions(),
      withPreloading(PreloadAllModules),
    ),
  ],
};
