import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingDisableDirective} from './loading-disable.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [LoadingDisableDirective],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoadingDisableDirective
  ]
})
export class LoadingDisableModule {
}
