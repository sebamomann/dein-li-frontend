import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedirectComponent} from './redirect.component';
import {RouterModule, Routes} from '@angular/router';
import {LockedComponent} from './locked/locked.component';

const routes: Routes = [
  {path: '', component: RedirectComponent},
  {path: 'notFound', loadChildren: './not-found/not-found.module#NotFoundModule'},
  {path: 'unknown', loadChildren: './unknown/unknown.module#UnknownModule'},
  {path: 'locked', loadChildren: './locked/locked.module#LockedModule'},
];

@NgModule({
  declarations: [RedirectComponent, LockedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class RedirectModule {
}
