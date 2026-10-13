import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountToolbarComponent} from './account-toolbar.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
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
