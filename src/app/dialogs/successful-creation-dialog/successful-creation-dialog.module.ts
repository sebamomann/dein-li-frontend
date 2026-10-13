import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuccessfulCreationDialogComponent} from './successful-creation-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
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
