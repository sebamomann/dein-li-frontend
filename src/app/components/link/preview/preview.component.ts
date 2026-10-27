import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ILink } from '../../../models/ILink.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from '../../../services/link.service';
import { UrlUtil } from '../../../_util/Url.util';
import { LinkUtil } from '../../../_util/Link.util';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PreviewComponent implements OnInit {
  public $link: Observable<ILink>;

  public short: string;
  public forwarding = false;
  public baseUrl = UrlUtil.getBaseDomain();

  private readonly forcePreview: boolean;

  @ViewChild('btnRef') gotoLinkBtn: MatButton;


  constructor(private route: ActivatedRoute, private router: Router,
    private linkService: LinkService) {
    // ?preview (or the "~" suffix, which arrives as type=preview) forces the preview page, even for links that open directly
    const queryParamMap = this.route.snapshot.queryParamMap;
    this.forcePreview = queryParamMap.has('preview') || queryParamMap.get('type') === 'preview';

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
    // shareReplay: the template's async pipe and the subscription below share one request,
    // so the button exists by the time we focus it
    this.$link = this.linkService.loadLinkByShort(this.short).pipe(shareReplay(1));
    this.$link.subscribe((data) => {
      if (data == null) {
        this.router.navigate(['/redirect'], {
          queryParams: {
            error: "not_found"
          }
        });
      } else if (data.openDirectly && !this.forcePreview) {
        // trusted owner chose to skip the preview; the API still stops at the threat page for reported links
        this.forwarding = true;
        LinkUtil.replaceLocation(window['env']['API_URL'] + "redirect/" + data.short);
      } else {
        setTimeout(() => {
          this.gotoLinkBtn?.focus();
        }, 100)
      }
    })
  }

  /**
   * Take passed link an open it in a new browser tab
   */
  public domainOf(url: string): string {
    return UrlUtil.domainOf(url);
  }

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
