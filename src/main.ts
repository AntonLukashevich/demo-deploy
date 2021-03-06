import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker.register('ngsw-worker.js')
      .then((reg) => {
        console.log('Registration succeeded. Scope is ' + reg.scope);
      }).catch((error) => {
      console.log('Registration failed with ' + error);
    });
  }
}).catch(err => console.error(err));
