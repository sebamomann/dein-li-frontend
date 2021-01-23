import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportBlockComponent} from './report-block.component';
import {MatIconModule, MatSnackBarModule} from '@angular/material';
import {ReportDialogModule} from '../../../dialogs/report-dialog/report-dialog.module';

@NgModule({
  declarations: [ReportBlockComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReportDialogModule,
    MatSnackBarModule
  ],
  exports: [
    ReportBlockComponent
  ]
})
export class ReportBlockModule {
}
