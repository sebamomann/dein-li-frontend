import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountToolbarComponent} from './account-toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AccountToolbarComponent],
  exports: [
    AccountToolbarComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ]
})
export class AccountToolbarModule {
}
