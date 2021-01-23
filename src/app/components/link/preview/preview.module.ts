import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreviewComponent} from './preview.component';
import {RouterModule, Routes} from '@angular/router';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';
import {MatButtonModule} from '@angular/material';
import {ReportBlockModule} from '../report-block/report-block.module';

const routes: Routes = [
  {
    path: '',
    component: PreviewComponent,
  },
];

@NgModule({
  declarations: [PreviewComponent],
  exports: [
    PreviewComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HexagonLoaderModule,
        MatButtonModule,
        ReportBlockModule,
    ]
})
export class PreviewModule {
}
