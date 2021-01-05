import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImpressumComponent} from './components/impressum/impressum.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: './components/dashboard/dashboard.module#DashboardModule'},
  {path: 'account', loadChildren: './components/account/account.module#AccountModule'},
  {path: 'link', loadChildren: './components/link/link-router/link-router.module#LinkRouterModule'},
  {path: 'redirect', loadChildren: './components/redirect/redirect.module#RedirectModule'},
  {path: 'impressum', component: ImpressumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
