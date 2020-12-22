import {Component} from '@angular/core';
import {ToolbarService} from './services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Dein Link - In Kurzform';

  constructor(private toolbarService: ToolbarService) {
    this.toolbarService.title$.subscribe((sTitle) => {
      this.title = sTitle;
    });
  }
}
