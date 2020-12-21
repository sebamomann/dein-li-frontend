import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material';

const routes: Routes = [
  {path: '', component: LinkComponent},
];

@NgModule({
  declarations: [LinkComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
  ]
})
export class LinkModule {
}
