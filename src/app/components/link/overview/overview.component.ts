import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ILink} from '../../../models/ILink.model';
import {LinkService} from '../../../services/link.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public $links: Observable<ILink[]>;

  constructor(private linkService: LinkService, private router: Router) {
  }

  ngOnInit() {
    this.$links = this.linkService.loadLinks();
  }

  public redirectToLink(link: ILink) {
    this.router.navigate(['/link'], {queryParams: {l: link.short}}).then(() => '');
  }
}
