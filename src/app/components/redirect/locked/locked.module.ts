import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {LockedComponent} from './locked.component';

const routes: Routes = [
  {path: '', component: LockedComponent},
];

@NgModule({
  declarations: [LockedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class LockedModule {
}
