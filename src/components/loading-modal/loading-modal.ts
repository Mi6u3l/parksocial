import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-modal',
  templateUrl: 'loading-modal.html',
  
})
export class LoadingModalComponent {
  isBusy;

  constructor() {
    this.isBusy = false;
  }
 
  show(){
    this.isBusy = true;
  }
 
  hide(){
    this.isBusy = false;
  }
 
  ngOnInit() {
    console.log('hello loading modal');
  }

}