import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ILink} from '../../../models/ILink.model';
import {LinkService} from '../../../services/link.service';
import {Router} from '@angular/router';
import {ToolbarService} from '../../../services/toolbar.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public $links: Observable<ILink[]>;
  public selected = 'iat';
  public order = 'DESC';

  constructor(private linkService: LinkService, private router: Router,
              private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    this.$links = this.linkService.loadLinks();

    this.toolbarService.setTitle('Deine Links');
  }

  public redirectToLink(link: ILink) {
    this.router.navigate(['/link'], {queryParams: {l: link.short}}).then(() => '');
  }

  public changedOrder() {
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';

    this.changedOrderBy();
  }

  public changedOrderBy() {
    this.$links = this.linkService.loadLinks(this.selected, this.order);
  }
}
