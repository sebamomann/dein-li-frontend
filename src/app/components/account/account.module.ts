import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {RegisterModule} from './register/register.module';

const routes: Routes = [
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'register', loadChildren: './register/register.module#RegisterModule'},
  {path: 'activate', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RegisterModule
  ]
})
export class AccountModule {
}
