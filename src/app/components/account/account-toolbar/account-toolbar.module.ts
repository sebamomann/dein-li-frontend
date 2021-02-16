import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountToolbarComponent} from './account-toolbar.component';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
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
