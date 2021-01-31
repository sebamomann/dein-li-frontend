import {Directive, HostListener, Input} from '@angular/core';
import {ShareObject} from '../../models/ShareObejct';
import {StringUtil} from '../../_util/String.util';
import {MatSnackBar} from '@angular/material';

@Directive({
  selector: '[appShare]'
})
export class ShareDirective {
  @Input()
  private shareObject: ShareObject;

  /**
   *
   */
  constructor(private snackBar: MatSnackBar) {
  }

  /**
   * On click onto element, initialize share.<br/>
   * Open navigator.share element of users device.<br/>
   * Allows user to share set data via other apps.<br/>
   * If current device has not share option, copy created Link to clipboard instead.
   */
  @HostListener('click')
  public click() {
    const navigator = window.navigator as any;

    if (navigator && navigator.share) {
      navigator.share(this.shareObject)
        .then(
          () => this.snackBar.open('Erfolgreich geteilt!', null, {
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

  /**
   * Copy complete URL of currently created link to the users clipboard
   */
  public copyLinkToClipboard(): void {
    StringUtil.copyToClipboard(this.shareObject.url);

    this.snackBar
      .open(
        'In die Zwischenablage kopiert', null,
        {
          duration: 2000,
          panelClass: 'snackbar-default'
        }
      );
  }
}
