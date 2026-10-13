import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddVersionDialogComponent} from './add-version-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
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
