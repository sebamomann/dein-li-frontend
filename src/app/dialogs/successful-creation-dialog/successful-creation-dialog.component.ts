import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ILink} from '../../models/ILink.model';
import {AuthenticationService} from '../../services/authentication.service';
import {StringUtil} from '../../_util/String.util';
import {ShareObject} from '../../models/ShareObejct';
import {UrlUtil} from '../../_util/Url.util';

@Component({
  selector: 'app-successful-creation-dialog',
  templateUrl: './successful-creation-dialog.component.html',
  styleUrls: ['./successful-creation-dialog.component.scss']
})
export class SuccessfulCreationDialogComponent {
  public completeUrl = UrlUtil.getApiDomain() + this.link.short;

  public userIsLoggedIn: boolean = this.authenticationService.userIsLoggedIn();

  constructor(@Inject(MAT_DIALOG_DATA) public link: ILink, private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<SuccessfulCreationDialogComponent>,
              private authenticationService: AuthenticationService) {
  }

  /**
   * Close entire creation dialog
   */
  public close() {
    this.dialogRef.close();
  }

  // TODO DUPE SEE LINK COMPONENT

  /**
   * Copy complete URL of currently created link to the users clipboard
   */
  public copyLinkToClipboard(): void {
    StringUtil.copyToClipboard(this.completeUrl);

    this.snackBar
      .open(
        'Link in die Zwischenablage kopiert', null,
        {
          duration: 2000,
          panelClass: 'snackbar-default'
        }
      );
  }

  /**
   * Open navigator.share element of users device.<br/>
   * Allows user to share set data via other apps.<br/>
   * If current device has not share option, copy created Link to clipboard instead.
   */
  public share(): void {
    const navigator = window.navigator as any;

    if (navigator && navigator.share) {
      const shareObject = new ShareObject();
      shareObject.title = 'dein.li Kurzlink';
      shareObject.text = 'dein.li Kurzlink' + ' - ' + 'Hier, für dich: ';
      shareObject.url = this.completeUrl;

      navigator.share(shareObject)
        .then(
          () => this.snackBar.open('Link erfolgreich geteilt', null, {
            duration: 2000,
            panelClass: 'snackbar-default'
          })
        )
        .catch(
          () => this.copyLinkToClipboard()
        );
    } else {
      this.copyLinkToClipboard();
    }
  }
}
