import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImpressumComponent} from './components/impressum/impressum.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'link', loadChildren: () => import('./components/link/link-router/link-router.module').then(m => m.LinkRouterModule)},
  {path: 'redirect', loadChildren: () => import('./components/redirect/redirect.module').then(m => m.RedirectModule)},
  {path: 'impressum', component: ImpressumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
