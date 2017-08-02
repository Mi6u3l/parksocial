import { Component, Input } from '@angular/core';

/**
 * Generated class for the ImageLoaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'image-loader',
  templateUrl: 'image-loader.html'
})
export class ImageLoaderComponent {
  @Input() src;
  text: string;

  constructor() {
    console.log('Hello ImageLoaderComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    console.log('hello image loader');
  }
}


