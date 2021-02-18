import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {IUser} from '../../../models/IUser.model';
import {AuthenticationValuesService} from '../../../services/authentication.values.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatMenuTrigger} from '@angular/material';


@Component({
  selector: 'app-account-toolbar',
  templateUrl: './account-toolbar.component.html',
  styleUrls: ['./account-toolbar.component.scss'],
  animations: [
    trigger('appearSidewards', [
      transition('void => *', [
        style({width: 0, paddingLeft: 0, paddingRight: 0, borderLeft: 'none'}),
        animate('750ms {{delay}}ms cubic-bezier(0,.48,.52,1.01)', style({
          width: '*',
          paddingLeft: '*',
          paddingRight: '*',
          borderLeft: '*'
        }))
      ], {params: {delay: 0}}),
    ]),
    trigger('appearScale', [
      transition('void => *', [
        style({
          transform: 'scale(0)',
        }),
        animate('500ms {{delay}}ms ease-out', style({
          transform: 'scale(1.15)',
        })),
        animate('250ms ease-out', style({
          transform: 'scale(1)',
        })),
      ], {params: {delay: 0}}),
    ]),
    trigger('removeScale', [
      transition('* => void', [
        style({transform: 'scale(1) rotate(*)'}),
        animate('150ms ease-in', style({transform: 'scale(1.1) rotate(1deg)'})),
        animate('350ms ease-out', style({transform: 'scale(0) rotate(1deg)'}))
      ]),
    ])
  ]
})

export class AccountToolbarComponent implements OnInit {

  @ViewChild('menuTrigger', {static: true}) menu: MatMenuTrigger;

  public username = '';
  public userIsLoggedIn = false;

  public refreshing = false;
  public refreshingOnInit: boolean;

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
    this.authenticationValuesService.refreshingSubject$.subscribe((val: boolean) => {
      this.refreshing = val;
    });
    this.refreshingOnInit = this.authenticationValuesService.refreshingSubject$.getValue();

    console.log(this.refreshingOnInit);
  }

  public login() {
    this.authenticationService.login();
  }

  public logout() {
    this.authenticationService.logout();
  }

  public openAccountSettings() {
    this.authenticationService.openAccountSettings();
  }

  public accountButtonAction() {
    if (!this.userIsLoggedIn) {
      this.menu.closeMenu();

      this.login();
    }
  }
}
