import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ILink} from '../../models/ILink.model';
import {AuthenticationService} from '../../services/authentication.service';
import {UrlUtil} from '../../_util/Url.util';
import {ShareObject} from '../../models/ShareObejct';

@Component({
  selector: 'app-successful-creation-dialog',
  templateUrl: './successful-creation-dialog.component.html',
  styleUrls: ['./successful-creation-dialog.component.scss']
})
export class SuccessfulCreationDialogComponent {
  public shareObject: ShareObject;

  public completeUrl = UrlUtil.getApiDomain() + this.link.short;
  public userIsLoggedIn: boolean = this.authenticationService.userIsLoggedIn();

  constructor(@Inject(MAT_DIALOG_DATA) public link: ILink, private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<SuccessfulCreationDialogComponent>,
              private authenticationService: AuthenticationService) {
    this.shareObject = new ShareObject();
    this.shareObject.url = this.completeUrl;
  }

  /**
   * Close entire creation dialog
   */
  public close() {
    this.dialogRef.close();
  }
}
