import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicCallChartComponent} from './basic-call-chart.component';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';
import {ReportBlockModule} from '../../link/report-block/report-block.module';


@NgModule({
  declarations: [BasicCallChartComponent],
  exports: [BasicCallChartComponent],
    imports: [
        CommonModule,
        HexagonLoaderModule,
        ReportBlockModule
    ]
})
export class BasicCallChartModule {
}
