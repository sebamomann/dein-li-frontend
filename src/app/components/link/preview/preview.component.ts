import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ILink} from '../../../models/ILink.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LinkService} from '../../../services/link.service';
import {UrlUtil} from '../../../_util/Url.util';
import {LinkUtil} from '../../../_util/Link.util';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  public $link: Observable<ILink>;

  public short: string;
  public baseUrl = UrlUtil.getBaseDomain();

  constructor(private route: ActivatedRoute, private router: Router,
              private linkService: LinkService) {
    this.route.queryParams
      .subscribe(
        params => {
          this.short = params.l;
        }
      );
  }

  /**
   * When view is loaded, load link by passed URL query parameter
   */
  public ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
  }

  /**
   * Take passed link an open it in a new browser tab
   *
   * @param link String   Link to open
   */
  public openLinkInNewTab(link: any) {
    LinkUtil.openLinkInNewTab(link);
  }
}
