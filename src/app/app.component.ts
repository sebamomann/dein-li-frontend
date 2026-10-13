import { ChangeDetectorRef, Component } from '@angular/core';
import { ToolbarService } from './services/toolbar.service';
import { UpdateService } from './services/update.service';
import { interval } from 'rxjs';
import { AuthenticationValuesService } from './services/authentication.values.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  public title = 'Dein Link - In Kurzform';

  constructor(private toolbarService: ToolbarService, public authenticationValuesService: AuthenticationValuesService,
    private update: UpdateService, private _cdr: ChangeDetectorRef) {
    this.toolbarService.title$.subscribe((sTitle) => {
      this.title = sTitle;
    });

    const source = interval(1000 * 60);

    source.subscribe(
      () => {
        this.update.checkForUpdate();
      }
    );
  }
}
