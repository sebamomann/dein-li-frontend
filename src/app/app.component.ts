import { ChangeDetectorRef, Component } from '@angular/core';
import { ToolbarService } from './services/toolbar.service';
import { Router } from '@angular/router';
import { UpdateService } from './services/update.service';
import { interval } from 'rxjs';
import { AuthenticationValuesService } from './services/authentication.values.service';
import { MatomoInjector } from 'ngx-matomo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Dein Link - In Kurzform';

  constructor(private toolbarService: ToolbarService, router: Router, public authenticationValuesService: AuthenticationValuesService,
    private update: UpdateService, private _cdr: ChangeDetectorRef,
    private matomoInjector: MatomoInjector) {
    this.toolbarService.title$.subscribe((sTitle) => {
      this.title = sTitle;
    });

    this.matomoInjector.init("https://matomo.sebamomann.de/", 4);

    const source = interval(1000 * 60);

    source.subscribe(
      () => {
        this.update.checkForUpdate();
      }
    );
  }
}
