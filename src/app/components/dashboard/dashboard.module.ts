import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {ShareModule} from '../../directives/share/share.module';
import {ChartFilterModule} from '../settings/chart-filter/chart-filter.module';
import {BasicCallChartModule} from '../charts/basic-call-chart/basic-call-chart.module';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: '**', redirectTo: '/impressum'},
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ShareModule,
        ChartFilterModule,
        BasicCallChartModule
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
