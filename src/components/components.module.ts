import { NgModule } from '@angular/core';
import { ImageLoaderComponent } from './image-loader/image-loader';
import { AutocompleteComponent } from './autocomplete/autocomplete';
@NgModule({
	declarations: [ImageLoaderComponent,
    AutocompleteComponent],
	imports: [],
	exports: [ImageLoaderComponent,
    AutocompleteComponent]
})
export class ComponentsModule {}
