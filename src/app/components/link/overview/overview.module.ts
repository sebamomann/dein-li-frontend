import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {HexagonLoaderModule} from '../../../html-templates/hexagon-loader/hexagon-loader.module';
import {TextPipesModule} from '../../../pipes/text-pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AccountToolbarModule} from '../../account/account-toolbar/account-toolbar.module';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
];

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HexagonLoaderModule,
    TextPipesModule,
    MatSelectModule,
    MatIconModule,
    InfiniteScrollModule,
    AccountToolbarModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class OverviewModule {
}
