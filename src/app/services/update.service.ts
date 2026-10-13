import {Injectable} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {filter} from 'rxjs/operators';

@Injectable()
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        const snack = this.snackbar.open('Neue Version verfügbar', 'Neu laden');
        snack
          .onAction()
          .subscribe(() => {
            window.location.reload();
          });
      });
  }

  public checkForUpdate() {
    this.swUpdate.checkForUpdate().then();
  }
}
