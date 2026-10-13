import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportDialogComponent} from './report-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
    ]
})
export class ReportDialogModule {
}
