import {Component, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Subscription} from 'rxjs';
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
export class SettingsComponent implements OnInit, OnDestroy {
  public account: IAccount;
  public failed = false;
  public saving = false;

  private subscription: Subscription;

  constructor(private accountService: AccountService, private snackBar: MatSnackBar,
              toolbarService: ToolbarService) {
    toolbarService.setTitle('Einstellungen');
  }

  ngOnInit(): void {
    this.subscription = this.accountService.me$.subscribe((account) => this.account = account);
    this.load();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public load() {
    this.failed = false;
    this.accountService.loadMe().subscribe((account) => {
      this.failed = !account && !this.account;
    });
  }

  /**
   * Let all links of the account skip the preview page
   */
  public setDirectForAll(event: MatSlideToggleChange) {
    this.saving = true;
    this.accountService.updateMe(event.checked)
      .subscribe({
        next: () => {
          this.saving = false;
          this.snackBar.open(event.checked ? 'Deine Links leiten jetzt direkt weiter' : 'Deine Links zeigen wieder die Vorschau',
            null, {duration: 3000});
        },
        error: () => {
          this.saving = false;
          event.source.checked = !event.checked;
          this.snackBar.open('Einstellung konnte nicht gespeichert werden', null, {duration: 3000});
        }
      });
  }
}
