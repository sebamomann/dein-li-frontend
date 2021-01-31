import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuccessfulCreationDialogComponent} from './successful-creation-dialog.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ShareModule} from '../../directives/share/share.module';


@NgModule({
  declarations: [SuccessfulCreationDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule,
        MatIconModule,
        RouterModule,
        ShareModule
    ]
})
export class SuccessfulCreationDialogModule {
}
