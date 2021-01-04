import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartFilterComponent } from './chart-filter.component';
import {MatCheckboxModule, MatInputModule, MatSelectModule} from '@angular/material';
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
        MatCheckboxModule
    ]
})
export class ChartFilterModule { }