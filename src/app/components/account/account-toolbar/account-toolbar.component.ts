import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {IUser} from '../../../models/IUser.model';
import {AuthenticationValuesService} from '../../../services/authentication.values.service';

@Component({
  selector: 'app-account-toolbar',
  templateUrl: './account-toolbar.component.html',
  styleUrls: ['./account-toolbar.component.scss']
})
export class AccountToolbarComponent implements OnInit {

  public username = '';
  public userIsLoggedIn = false;

  constructor(public authenticationValuesService: AuthenticationValuesService,
              private authenticationService: AuthenticationService,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.authenticationValuesService.loginStatus$.subscribe((status: boolean) => {
      this.userIsLoggedIn = status;
    });
    this.authenticationValuesService.currentUserSubject$.subscribe((user: IUser) => {
      this.username = user ? user.preferred_username : '';
    });
  }

  public login() {
    this.authenticationService.login().catch((err) => {
      console.log(err);
      console.log('login error');
    });
  }

  public logout() {
    this.authenticationService.logout();
  }

  public openAccountSettings() {
    this.authenticationService.openAccountSettings();
  }
}
