import { NgModule } from '@angular/core';
import { ImageLoaderComponent } from './image-loader/image-loader';
import { LoadingModalComponent } from './loading-modal/loading-modal';
@NgModule({
	declarations: [ImageLoaderComponent,
    LoadingModalComponent],
	imports: [],
	exports: [ImageLoaderComponent,
    LoadingModalComponent]
})
export class ComponentsModule {}
