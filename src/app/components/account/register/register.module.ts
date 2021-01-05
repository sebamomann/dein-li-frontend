import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {UserDataModule} from '../form/user-data/user-data.module';

const routes: Routes = [
  {path: '', component: RegisterComponent},
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    UserDataModule,
  ]
})
export class RegisterModule {
}
