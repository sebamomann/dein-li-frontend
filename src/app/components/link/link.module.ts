import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {MatDialogModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import {AddVersionDialogComponent} from '../../dialogs/add-version-dialog/add-version-dialog.component';
import {AddVersionDialogModule} from '../../dialogs/add-version-dialog/add-version-dialog.module';

const routes: Routes = [
  {
    component: LinkComponent,
    matcher: (url) => {
      if (url.length === 1 && url[0].path.match(/^link\?l=/gm)) {
        return {
          consumed: url,
          posParams: {
            username: new UrlSegment(url[0].path.substr(1), {})
          }
        };
      }
      return null;
    },
  },
  {
    path: '',
    loadChildren: './overview/overview.module#OverviewModule',
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
    AddVersionDialogModule
  ],
  entryComponents: [
    AddVersionDialogComponent
  ]
})
export class LinkModule {
}
