import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {AccountsComponent} from './accounts.component';
import {AuthGuard} from '../../../_helper/auth.gaurd';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';

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
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    HexagonLoaderModule,
  ]
})
export class AccountsModule {
}
