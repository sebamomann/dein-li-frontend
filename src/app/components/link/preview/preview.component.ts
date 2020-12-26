import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ILinkStats} from '../../../models/ILinkStats.model';
import {ILink} from '../../../models/ILink.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LinkService} from '../../../services/link.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  public $link: Observable<ILink>;
  public $linkStats: Observable<ILinkStats>;

  public short: string;
  public baseUrl = environment.API_URL.replace('https://', '').replace('http://', '');

  constructor(private route: ActivatedRoute, private router: Router,
              private linkService: LinkService) {
    this.route.queryParams.subscribe(params => {
      this.short = params.l;
    });
  }

  ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
    this.$linkStats = this.linkService.loadLinkStats(this.short, true);
  }

  openLinkInNewTab(original: any) {
    window.open(original, '_blank');
  }
}
