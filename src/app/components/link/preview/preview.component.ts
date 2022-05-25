import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILink } from '../../../models/ILink.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from '../../../services/link.service';
import { UrlUtil } from '../../../_util/Url.util';
import { LinkUtil } from '../../../_util/Link.util';

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
    if (!this.route.snapshot.paramMap.get('link')) {
      this.route.queryParams
        .subscribe(
          params => {
            this.short = params.l;
          }
        );
    } else {
      this.short = this.route.snapshot.paramMap.get('link')
    }
  }

  /**
   * When view is loaded, load link by passed URL query parameter
   */
  public ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
    this.$link.subscribe((data) => {
      if (data == null) {
        this.router.navigate(['/redirect'], {
          queryParams: {
            error: "not_found"
          }
        });
      }
    })
  }

  /**
   * Take passed link an open it in a new browser tab
   */
  public redirectToHome() {
    this.router.navigate(["/"])
  }

  /**
   * Take passed link an open it in a new browser tab
   *
   * @param short String   Short link to open
   */
  public openLinkInSameTab(short: any) {
    LinkUtil.openLinkInSameTab(window['env']['API_URL'] + "redirect/" + short + "?skip_threat=true");
  }
}
