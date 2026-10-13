import { ChangeDetectorRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarService } from './services/toolbar.service';
import { UpdateService } from './services/update.service';
import { interval } from 'rxjs';
import { AuthenticationValuesService } from './services/authentication.values.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  public title = 'Dein Link - In Kurzform';

  constructor(private toolbarService: ToolbarService, public authenticationValuesService: AuthenticationValuesService,
    private update: UpdateService, private _cdr: ChangeDetectorRef, private documentTitle: Title) {
    // The page title lives in the browser tab; the top bar stays quiet
    this.toolbarService.title$.subscribe((sTitle) => {
      this.title = sTitle;
      this.documentTitle.setTitle(sTitle && sTitle !== 'Home' ? `${sTitle} · dein.li` : 'dein.li – Lange Links, kurz und sicher');
    });

    const source = interval(1000 * 60);

    source.subscribe(
      () => {
        this.update.checkForUpdate();
      }
    );
  }
}
