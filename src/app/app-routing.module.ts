import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'link', loadChildren: () => import('./components/link/link-router/link-router.module').then(m => m.LinkRouterModule) },
  { path: 'redirect', loadChildren: () => import('./components/redirect/redirect.module').then(m => m.RedirectModule) },
  { path: 'impressum', component: ImpressumComponent },
  { matcher: match, redirectTo: '/link/preview/:link' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

function match(url: UrlSegment[]) {
  const leurl = [new UrlSegment('segment', {})];
  return {
    consumed: leurl,
    posParams: { 'link': new UrlSegment(url[0].path, {}) }
  }
}

