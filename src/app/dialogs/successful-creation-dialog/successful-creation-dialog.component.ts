import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ILink} from '../../models/ILink.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-successful-creation-dialog',
  templateUrl: './successful-creation-dialog.component.html',
  styleUrls: ['./successful-creation-dialog.component.scss']
})
export class SuccessfulCreationDialogComponent implements OnInit {
  public completeUrl: any;

  constructor(@Inject(MAT_DIALOG_DATA) public link: ILink, private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<SuccessfulCreationDialogComponent>) {
    this.completeUrl = environment.API_URL + link.short;
  }

  ngOnInit() {
  }

  copyLinkToClipboard() {
    const val = this.completeUrl;

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackBar.open('Link in die Zwischenablage kopiert', null, {
      duration: 2000,
      panelClass: 'snackbar-default'
    });
  }

  close() {
    this.dialogRef.close();
  }
}
