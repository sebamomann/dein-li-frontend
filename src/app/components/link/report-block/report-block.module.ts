import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportBlockComponent} from './report-block.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ReportDialogModule} from '../../../dialogs/report-dialog/report-dialog.module';

@NgModule({
  declarations: [ReportBlockComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ReportDialogModule,
    MatSnackBarModule
  ],
  exports: [
    ReportBlockComponent
  ]
})
export class ReportBlockModule {
}
