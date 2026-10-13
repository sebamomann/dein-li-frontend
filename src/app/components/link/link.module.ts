import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import {RouterModule, Routes} from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import {AddVersionDialogComponent} from '../../dialogs/add-version-dialog/add-version-dialog.component';
import {AddVersionDialogModule} from '../../dialogs/add-version-dialog/add-version-dialog.module';
import {AuthGuard} from '../../_helper/auth.gaurd';
import {HexagonLoaderModule} from '../../html-templates/hexagon-loader/hexagon-loader.module';
import {ChartFilterModule} from '../settings/chart-filter/chart-filter.module';
import {BasicCallChartModule} from '../charts/basic-call-chart/basic-call-chart.module';
import {ShareModule} from '../../directives/share/share.module';

const routes: Routes = [
  {
    path: '',
    component: LinkComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
    declarations: [LinkComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        AddVersionDialogModule,
        HexagonLoaderModule,
        MatExpansionModule,
        MatInputModule,
        ChartFilterModule,
        BasicCallChartModule,
        MatButtonModule,
        ShareModule
    ]
})
export class LinkModule {
}
