import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
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
  public accounts: IAccount[];
  public failed = false;
  public meId: string;

  /**
   * Accounts with a request in flight
   */
  public pending = new Set<string>();

  constructor(private accountService: AccountService, private snackBar: MatSnackBar,
              toolbarService: ToolbarService) {
    toolbarService.setTitle('Konten');
  }

  ngOnInit(): void {
    this.meId = this.accountService.me$.getValue()?.id;
    this.accountService.me$.subscribe((account) => this.meId = account?.id);
    this.load();
  }

  public get trustedCount(): number {
    return this.accounts?.filter((account) => account.trusted).length ?? 0;
  }

  public load() {
    this.failed = false;
    this.accountService.loadAll().subscribe((accounts) => {
      this.accounts = accounts;
      this.failed = !accounts;
    });
  }

  /**
   * Trust or distrust an account. Trusted accounts may let their links skip the preview page.
   */
  public setTrusted(account: IAccount, event: MatSlideToggleChange) {
    this.pending.add(account.id);
    this.accountService.setTrusted(account.id, event.checked)
      .subscribe({
        next: (updated) => {
          this.pending.delete(account.id);
          Object.assign(account, updated);
        },
        error: () => {
          this.pending.delete(account.id);
          event.source.checked = !event.checked;
          this.snackBar.open('Konto konnte nicht geändert werden', null, {duration: 3000});
        }
      });
  }
}
