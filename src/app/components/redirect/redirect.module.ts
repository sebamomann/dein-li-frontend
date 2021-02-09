import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedirectComponent} from './redirect.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {HexagonLoaderModule} from '../../html-templates/hexagon-loader/hexagon-loader.module';

const routes: Routes = [
  {path: '', component: RedirectComponent},
  {path: 'notFound', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: 'unknown', loadChildren: () => import('./unknown/unknown.module').then(m => m.UnknownModule)},
  {path: 'locked', loadChildren: () => import('./locked/locked.module').then(m => m.LockedModule)},
  {path: 'threat', loadChildren: () => import('./threat/threat.module').then(m => m.ThreatModule)},
];

@NgModule({
  declarations: [RedirectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HexagonLoaderModule
  ]
})

export class RedirectModule {
}
