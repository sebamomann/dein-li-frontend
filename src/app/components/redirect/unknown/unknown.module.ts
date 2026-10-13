import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnknownComponent} from './unknown.component';
import {RouterModule, Routes} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: UnknownComponent},
];

@NgModule({
  declarations: [UnknownComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class UnknownModule {
}
