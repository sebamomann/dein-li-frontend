import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
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
