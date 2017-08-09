import { NgModule } from '@angular/core';
import { EnvVariables } from './environment-variables.token';
import { devVariables } from './development';
import { prodVariables } from './production';


export function environmentFactory() {
  //return process.env.IONIC_ENV === 'prod' ? prodVariables : devVariables;
  return prodVariables;
}

@NgModule({
  providers: [
    {
      provide: EnvVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}