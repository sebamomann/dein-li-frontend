import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreviewComponent} from './preview.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PreviewComponent,
  },
];

@NgModule({
  declarations: [PreviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PreviewModule {
}
