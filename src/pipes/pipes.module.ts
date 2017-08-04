import { NgModule } from '@angular/core';
import { OrderByDistance } from './../pipes/orderByDistance/orderByDistance';
import {CommonModule} from "@angular/common";

@NgModule({
	declarations: [OrderByDistance],
	imports: [CommonModule],
	exports: [OrderByDistance]
})
export class PipesModule {}
