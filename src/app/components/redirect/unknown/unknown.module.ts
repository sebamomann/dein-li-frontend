import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownComponent } from './unknown.component';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '../not-found/not-found.component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';

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
