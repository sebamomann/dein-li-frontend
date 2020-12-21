import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import {RouterModule, Routes} from '@angular/router';
import {MatDialogModule, MatIconModule} from '@angular/material';
import {AddVersionDialogComponent} from '../../dialogs/add-version-dialog/add-version-dialog.component';
import {AddVersionDialogModule} from '../../dialogs/add-version-dialog/add-version-dialog.module';

const routes: Routes = [
  {path: '', component: LinkComponent},
];

@NgModule({
  declarations: [LinkComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatDialogModule,
    AddVersionDialogModule
  ],
  entryComponents: [
    AddVersionDialogComponent
  ]
})
export class LinkModule {
}
