import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ReportDialogComponent} from '../../../dialogs/report-dialog/report-dialog.component';
import {LinkService} from '../../../services/link.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-report-block',
    templateUrl: './report-block.component.html',
    styleUrls: ['./report-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ReportBlockComponent {

  @Input()
  short: string;

  // 'nav' renders a compact top-bar action, 'inline' a quiet text action inside a page
  @Input()
  variant: 'nav' | 'inline' = 'inline';

  constructor(public dialog: MatDialog, private linkService: LinkService,
              private snackBar: MatSnackBar) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      maxWidth: '500px',
      data: {short: this.short},
      id: 'report-dialog'
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) {
          return;
        }

        this.linkService
          .report(result.short)
          .subscribe((sResponse) => {
            if (sResponse instanceof HttpErrorResponse) {
              if (sResponse.status === 404) {
                this.snackBar.open('Diesen Kurzlink gibt es nicht', 'OK', {
                  panelClass: 'snackbar-default'
                });
              } else {
                this.snackBar.open('Melden hat nicht geklappt. Versuche es gleich noch einmal.', 'OK', {
                  panelClass: 'snackbar-default'
                });
              }
            } else {
              this.snackBar.open('Danke! Der Link wurde gemeldet.', null, {
                duration: 2000,
                panelClass: 'snackbar-default'
              });
            }
          });
      });
  }

}
