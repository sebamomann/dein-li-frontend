import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UrlUtil} from '../../_util/Url.util';

interface ReportDialogData {
  short: string;
}

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent {
  public short: string;
  public baseUrl = UrlUtil.getApiDomain();

  public event = new FormGroup({
    short: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportDialogData) {
    this.short = data.short;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick() {
    let short = this.short;

    if (!this.short) {
      if (!this.event.valid) {
        this.event.get('short').setErrors({required: true});
        return;
      } else {
        short = this.event.get('short').value;
      }
    }

    this.dialogRef.close({short});
  }

  public getShortErrors() {
    if (this.event.get('short').hasError('required')) {
      return 'Erforderlich';
    }
  }
}
