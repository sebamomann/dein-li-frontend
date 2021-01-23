import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportDialogComponent} from './report-dialog.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ReportDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ReportDialogComponent]
})
export class ReportDialogModule {
}
