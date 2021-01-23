import {Component, Input} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ReportDialogComponent} from '../../../dialogs/report-dialog/report-dialog.component';
import {LinkService} from '../../../services/link.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-report-block',
  templateUrl: './report-block.component.html',
  styleUrls: ['./report-block.component.scss']
})
export class ReportBlockComponent {

  @Input()
  short: string;

  constructor(public dialog: MatDialog, private linkService: LinkService,
              private snackBar: MatSnackBar) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      maxWidth: '500px',
      data: {short: this.short}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.linkService
        .report(result.short)
        .subscribe((sResponse) => {
          if (sResponse instanceof HttpErrorResponse) {
            if (sResponse.status === 404) {
              this.snackBar.open('Link konnte gefunden werden', 'OK', {
                panelClass: 'snackbar-default'
              });
            } else {
              this.snackBar.open('Link konnte nicht gemeldet werden', 'OK', {
                panelClass: 'snackbar-default'
              });
            }
          } else {
            this.snackBar.open('Link erfolgreich gemeldet!', null, {
              duration: 2000,
              panelClass: 'snackbar-default'
            });
          }
        });
    });
  }

}
