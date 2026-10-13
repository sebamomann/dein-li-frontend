import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartFilterComponent } from './chart-filter.component';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ChartFilterComponent],
  exports: [
    ChartFilterComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule
  ]
})
export class ChartFilterModule { }
