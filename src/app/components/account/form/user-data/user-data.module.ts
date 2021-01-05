import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDataComponent} from './user-data.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTooltipModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingDisableModule} from '../../../../directives/loading-disable/loading-disable.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [UserDataComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    LoadingDisableModule,
    RouterModule
  ],
  exports: [
    UserDataComponent
  ]
})
export class UserDataModule {
}
