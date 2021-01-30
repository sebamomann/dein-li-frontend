import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ILink} from '../../../models/ILink.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LinkService} from '../../../services/link.service';
import {UrlUtil} from '../../../_util/Url.util';

@Component({
  selector: 'app-threat',
  templateUrl: './threat.component.html',
  styleUrls: ['./threat.component.scss']
})
export class ThreatComponent implements OnInit {
  public $link: Observable<ILink>;

  public short: string;
  public baseUrl = UrlUtil.getApiDomain();

  constructor(private route: ActivatedRoute, private router: Router,
              private linkService: LinkService) {
    this.route.queryParams.subscribe(params => {
      this.short = params.short;
    });
  }

  ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
  }

  openLinkInNewTab(original: any) {
    window.open(original, '_blank');
  }
}
