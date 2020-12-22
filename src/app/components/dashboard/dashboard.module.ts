import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {SuccessfulCreationDialogComponent} from '../../dialogs/successful-creation-dialog/successful-creation-dialog.component';
import {SuccessfulCreationDialogModule} from '../../dialogs/successful-creation-dialog/successful-creation-dialog.module';

const routes: Routes = [
  {path: '', component: DashboardComponent},
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
    SuccessfulCreationDialogModule
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
