import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkRouterComponent} from './link-router.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../_helper/auth.gaurd';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: '../overview/overview.module#OverviewModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'specific',
    loadChildren: '../link.module#LinkModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LinkRouterComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [LinkRouterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LinkRouterModule {
}
