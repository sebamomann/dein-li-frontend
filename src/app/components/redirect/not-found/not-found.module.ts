import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from './not-found.component';
import {RouterModule, Routes} from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: NotFoundComponent},
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class NotFoundModule {
}
