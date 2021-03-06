import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {SuccessfulCreationDialogComponent} from '../../dialogs/successful-creation-dialog/successful-creation-dialog.component';
import {SuccessfulCreationDialogModule} from '../../dialogs/successful-creation-dialog/successful-creation-dialog.module';
import {ChartFilterModule} from '../settings/chart-filter/chart-filter.module';
import {BasicCallChartModule} from '../charts/basic-call-chart/basic-call-chart.module';
import {ReportBlockModule} from '../link/report-block/report-block.module';
import {AccountToolbarModule} from '../account/account-toolbar/account-toolbar.module';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: '**', redirectTo: '/impressum'},
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SuccessfulCreationDialogModule,
    ChartFilterModule,
    BasicCallChartModule,
    ReportBlockModule,
    AccountToolbarModule
  ],
  exports: [
    DashboardComponent
  ],
  entryComponents: [
    SuccessfulCreationDialogComponent
  ]
})
export class DashboardModule {
}
