import {Component} from '@angular/core';
import {ToolbarService} from './services/toolbar.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Dein Link - In Kurzform';

  constructor(private toolbarService: ToolbarService, router: Router) {
    this.toolbarService.title$.subscribe((sTitle) => {
      this.title = sTitle;
    });

    const navEndEvent$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );
    navEndEvent$.subscribe((e: NavigationEnd) => {
      gtag('config', 'MY_ID', {page_path: e.urlAfterRedirects});
    });
  }
}
