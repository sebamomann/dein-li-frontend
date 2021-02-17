import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {IUser} from '../../../models/IUser.model';
import {AuthenticationValuesService} from '../../../services/authentication.values.service';
import {animate, style, transition, trigger} from '@angular/animations';


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
          borderRadius: '100%',
          backgroundColor: '#1C1B1B'
        }),
        animate('500ms {{delay}}ms ease-out', style({
          transform: 'scale(1.15)',
          backgroundColor: '#1C1B1B',
          borderRadius: '100%'
        })),
        animate('250ms ease-out', style({
          transform: 'scale(1)',
          backgroundColor: '#1C1B1B',
          borderRadius: '100%'
        })),
        animate('0ms 750ms ease-out', style({backgroundColor: 'transparent', borderRadius: '100%'})),
      ], {params: {delay: 0}}),
    ]),
    trigger('removeScale', [
      transition('* => void', [
        style({transform: 'scale(1)'}),
        animate('150ms ease-in', style({transform: 'scale(1.1)'})),
        animate('350ms ease-out', style({transform: 'scale(0)'}))
      ]),
    ])
  ]
})

export class AccountToolbarComponent implements OnInit {

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
