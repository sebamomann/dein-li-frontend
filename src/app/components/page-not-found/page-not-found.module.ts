import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
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
