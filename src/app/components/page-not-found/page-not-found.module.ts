import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { PageNotFoundComponent } from './page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class PageNotFoundModule { }
