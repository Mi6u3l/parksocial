import { Pipe, PipeTransform } from '@angular/core';
import Raven from 'raven-js';

@Pipe({
  name: 'orderByDistance',
})
export class OrderByDistance implements PipeTransform {

   transform(spots): Array<any> {
    spots.sort((a, b) => {
          return a['parkingSpot']['distance'] - b['parkingSpot']['distance'];
      });
    return spots;
  }

}
