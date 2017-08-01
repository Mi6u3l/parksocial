import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IonicErrorHandler } from 'ionic-angular';  
import Raven from 'raven-js';

Raven  
    .config('https://cdeb3c798c1b4ae1ac4102b64908de45@sentry.io/198215')
    .install();
/*
  Generated class for the SentryErrorhandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SentryErrorhandlerProvider extends IonicErrorHandler {

    handleError(error) {
        super.handleError(error);

        try {
          Raven.captureException(error.originalError || error);
        }
        catch(e) {
          console.error(e);
        }
    }
}