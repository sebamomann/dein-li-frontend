import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDirective } from './share.directive';



@NgModule({
  declarations: [ShareDirective],
  exports: [
    ShareDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }
