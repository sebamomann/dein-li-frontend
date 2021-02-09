import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkRouterComponent} from './link-router.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../_helper/auth.gaurd';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('../overview/overview.module').then(m => m.OverviewModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'specific',
    loadChildren: () => import('../link.module').then(m => m.LinkModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'preview',
    loadChildren: () => import('../preview/preview.module').then(m => m.PreviewModule),
  },
  {
    path: '',
    component: LinkRouterComponent,
  },
];

@NgModule({
  declarations: [LinkRouterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HexagonLoaderModule
  ]
})
export class LinkRouterModule {
}
