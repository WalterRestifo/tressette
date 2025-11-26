import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SocketIoConfig, provideSocketIo } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'https://tressette-863401855094.europe-west1.run.app/',
  options: {},
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideSocketIo(config),
  ],
};
