import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedirectComponent} from './redirect.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {HexagonLoaderModule} from '../../html-templates/hexagon-loader/hexagon-loader.module';

const routes: Routes = [
  {path: '', component: RedirectComponent},
  {path: 'notFound', loadChildren: './not-found/not-found.module#NotFoundModule'},
  {path: 'unknown', loadChildren: './unknown/unknown.module#UnknownModule'},
  {path: 'locked', loadChildren: './locked/locked.module#LockedModule'},
  {path: 'threat', loadChildren: './threat/threat.module#ThreatModule'},
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
