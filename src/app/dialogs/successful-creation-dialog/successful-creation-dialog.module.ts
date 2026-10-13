import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuccessfulCreationDialogComponent} from './successful-creation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
