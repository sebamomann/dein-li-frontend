import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreviewComponent} from './preview.component';
import {RouterModule, Routes} from '@angular/router';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';

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
    HexagonLoaderModule,
  ]
})
export class PreviewModule {
}
