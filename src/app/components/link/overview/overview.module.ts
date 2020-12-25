import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {SuccessfulCreationDialogComponent} from '../../../dialogs/successful-creation-dialog/successful-creation-dialog.component';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';
import {AppModule} from '../../../app.module';
import {TextPipesModule} from '../../../pipes/text-pipes.module';
import {MatIconModule, MatSelectModule} from '@angular/material';

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
    TextPipesModule,
    MatSelectModule,
    MatIconModule,
  ]
})
export class OverviewModule {
}
