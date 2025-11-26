import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from './../environments/environment';

import { routes } from './app.routes';
import { SocketIoConfig, provideSocketIo } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: {},
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideSocketIo(config),
  ],
};
