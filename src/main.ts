import '@angular/compiler'; // <-- Agrégalo explícitamente en la línea 1 si persiste el error
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));