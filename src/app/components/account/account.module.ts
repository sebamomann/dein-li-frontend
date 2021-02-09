import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {RegisterModule} from './register/register.module';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
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
