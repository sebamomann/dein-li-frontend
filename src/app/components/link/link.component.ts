import {Component, OnInit} from '@angular/core';
import {ILink} from '../../models/ILink.model';
import {ActivatedRoute} from '@angular/router';
import {LinkService} from '../../services/link.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  public $link: Observable<ILink>;
  public $linkVersions: Observable<ILink[]>;
  public short: string;

  constructor(private route: ActivatedRoute, private linkService: LinkService) {
    this.route.queryParams.subscribe(params => {
      this.short = params.l;
    });
  }

  ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
    this.$linkVersions = this.linkService.loadLinkVersions(this.short);
  }
}
