import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddVersionDialogComponent} from './add-version-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AddVersionDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [AddVersionDialogComponent]
})
export class AddVersionDialogModule {
}
