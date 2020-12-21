import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddVersionDialogComponent} from './add-version-dialog.component';
import {MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';
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
