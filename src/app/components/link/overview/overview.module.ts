import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {SuccessfulCreationDialogComponent} from '../../../dialogs/successful-creation-dialog/successful-creation-dialog.component';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
];


@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HexagonLoaderModule,
  ]
})
export class OverviewModule {
}
