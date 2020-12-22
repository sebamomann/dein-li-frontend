import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'logout', component: LogoutComponent},
];


@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AccountModule {
}
