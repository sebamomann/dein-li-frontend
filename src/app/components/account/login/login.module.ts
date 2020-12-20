import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSnackBarModule, MatStepperModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {LoadingDisableModule} from '../../../directives/loading-disable/loading-disable.module';
import {ValidatorService} from '../../../_helper/validatorService';

const routes: Routes = [
  {path: '', component: LoginComponent},
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    LoadingDisableModule
  ],
  providers: [
    ValidatorService,
  ]
})
export class LoginModule {
}
