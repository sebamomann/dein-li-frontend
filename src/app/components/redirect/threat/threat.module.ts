import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import {ThreatComponent} from './threat.component';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';

const routes: Routes = [
  {path: '', component: ThreatComponent},
];

@NgModule({
  declarations: [ThreatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HexagonLoaderModule,
  ]
})
export class ThreatModule {
}
