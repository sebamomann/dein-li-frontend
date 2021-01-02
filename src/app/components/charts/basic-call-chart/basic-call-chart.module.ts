import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicCallChartComponent} from './basic-call-chart.component';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';


@NgModule({
  declarations: [BasicCallChartComponent],
  exports: [BasicCallChartComponent],
  imports: [
    CommonModule,
    HexagonLoaderModule
  ]
})
export class BasicCallChartModule {
}
