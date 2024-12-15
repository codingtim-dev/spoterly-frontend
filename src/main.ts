import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {RuntimeEnvironmentService} from './app/services/runtime-environment.service';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

const runtimeEnvironmentService = new RuntimeEnvironmentService();

runtimeEnvironmentService
  .loadConfig()
  .then(() => {
    platformBrowserDynamic([
      {provide: RuntimeEnvironmentService, useValue: runtimeEnvironmentService},
    ])
      .bootstrapModule(AppComponent)
      .catch((err) => console.error(err));
  });
