import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountService} from '../../../services/account.service';
import {IAccount} from '../../../models/IAccount.model';
import {ToolbarService} from '../../../services/toolbar.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SettingsComponent implements OnInit {
  public $account: Observable<IAccount>;

  constructor(private accountService: AccountService, private snackBar: MatSnackBar,
              toolbarService: ToolbarService) {
    toolbarService.setTitle('Einstellungen');
  }

  ngOnInit(): void {
    this.$account = this.accountService.me$;
    this.accountService.loadMe().subscribe();
  }

  /**
   * Let all links of the account skip the preview page
   */
  public setDirectForAll(event: MatSlideToggleChange) {
    this.accountService.updateMe(event.checked)
      .subscribe({
        error: () => {
          event.source.checked = !event.checked;
          this.snackBar.open('Einstellung konnte nicht gespeichert werden', null, {duration: 3000});
        }
      });
  }
}
