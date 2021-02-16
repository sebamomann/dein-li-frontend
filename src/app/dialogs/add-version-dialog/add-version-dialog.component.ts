import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LinkService} from '../../services/link.service';
import {ILink} from '../../models/ILink.model';
import {Subscription} from 'rxjs';

// @ts-ignore
const validUrl = require('valid-url');

@Component({
  selector: 'app-add-version-dialog',
  templateUrl: './add-version-dialog.component.html',
  styleUrls: ['./add-version-dialog.component.scss']
})
export class AddVersionDialogComponent implements OnInit, OnDestroy {
  public link: any;
  public event: FormGroup;

  @Output()
  done = new EventEmitter<ILink>();

  private output$$: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public short: string,
              private formBuilder: FormBuilder, private linkService: LinkService,
              private dialogRef: MatDialogRef<AddVersionDialogComponent>) {
    this.link = environment.API_URL + short;
  }

  ngOnInit() {
    this.event = this.formBuilder.group({
      link: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy() {
    if (this.output$$) {
      this.output$$.unsubscribe();
    }
  }

  public saveFnc() {
    const link = this.get('link').value;

    if (!validUrl.isUri(link)) {
      this.get('link').setErrors({invalid: true});
    }

    const output$ = this.linkService.createNewVersion(this.short, link);

    this.output$$ = output$.subscribe(_ => {
      this.dialogRef.close(link);
    });
  }


  public getLinkErrorMessage(): string {
    if (this.get('link').hasError('invalid')) {
      return 'Gebe einen gültigen Link ein ';
    } else if (this.get('link').hasError('required')) {
      return 'Bitte gebe einen Link ein';
    }
  }

  private get(str: string) {
    return this.event.get(str);
  }
}
