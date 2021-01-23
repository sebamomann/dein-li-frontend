import {Component} from '@angular/core';
import {ToolbarService} from './services/toolbar.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthenticationService} from './services/authentication.service';
import {IUser} from './models/IUser.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Dein Link - In Kurzform';
  public userIsLoggedIn: boolean;
  public username: string;

  constructor(private toolbarService: ToolbarService, router: Router, private authenticationService: AuthenticationService) {
    this.toolbarService.title$.subscribe((sTitle) => {
      this.title = sTitle;
    });

    const navEndEvent$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );

    this.authenticationService.loginStatus$.subscribe((status: boolean) => this.userIsLoggedIn = status);
    this.authenticationService.currentUserSubject$.subscribe((user: IUser) => this.username = user.username);
  }
}
