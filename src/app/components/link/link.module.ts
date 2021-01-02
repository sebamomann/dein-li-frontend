import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import {RouterModule, Routes} from '@angular/router';
import {MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {AddVersionDialogComponent} from '../../dialogs/add-version-dialog/add-version-dialog.component';
import {AddVersionDialogModule} from '../../dialogs/add-version-dialog/add-version-dialog.module';
import {AuthGuard} from '../../_helper/auth.gaurd';
import {HexagonLoaderModule} from '../../html-templates/hexagon-loader/hexagon-loader.module';
import {FormsModule} from '@angular/forms';

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
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  entryComponents: [
    AddVersionDialogComponent
  ]
})
export class LinkModule {
}
