import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {AccountsComponent} from './accounts.component';
import {AuthGuard} from '../../../_helper/auth.gaurd';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatSnackBarModule,
  ]
})
export class AccountsModule {
}
