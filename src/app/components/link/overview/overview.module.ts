import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {SuccessfulCreationDialogComponent} from '../../../dialogs/successful-creation-dialog/successful-creation-dialog.component';

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
  ]
})
export class OverviewModule {
}
