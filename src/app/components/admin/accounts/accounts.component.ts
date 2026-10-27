import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountService} from '../../../services/account.service';
import {IAccount} from '../../../models/IAccount.model';
import {ToolbarService} from '../../../services/toolbar.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AccountsComponent implements OnInit {
  public $accounts: Observable<IAccount[]>;

  constructor(private accountService: AccountService, private snackBar: MatSnackBar,
              toolbarService: ToolbarService) {
    toolbarService.setTitle('Konten');
  }

  ngOnInit(): void {
    this.$accounts = this.accountService.loadAll();
  }

  /**
   * Trust or distrust an account. Trusted accounts may let their links skip the preview page.
   */
  public setTrusted(account: IAccount, event: MatSlideToggleChange) {
    this.accountService.setTrusted(account.id, event.checked)
      .subscribe({
        next: (updated) => {
          Object.assign(account, updated);
        },
        error: () => {
          event.source.checked = !event.checked;
          this.snackBar.open('Konto konnte nicht geändert werden', null, {duration: 3000});
        }
      });
  }

  public accountTrackBy(index: number, account: IAccount) {
    return account.id;
  }
}
