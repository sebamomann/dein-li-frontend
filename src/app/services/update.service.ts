import {Injectable} from '@angular/core';

import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import {SwUpdate} from '@angular/service-worker';

@Injectable()
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    this.swUpdate.available.subscribe(evt => {
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
