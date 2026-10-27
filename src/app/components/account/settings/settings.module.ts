import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {SettingsComponent} from './settings.component';
import {AuthGuard} from '../../../_helper/auth.gaurd';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    HexagonLoaderModule,
  ]
})
export class SettingsModule {
}
