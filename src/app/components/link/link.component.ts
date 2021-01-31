import {Component, OnInit, ViewChild} from '@angular/core';
import {ILink} from '../../models/ILink.model';
import {ActivatedRoute} from '@angular/router';
import {LinkService} from '../../services/link.service';
import {Observable} from 'rxjs';

import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {AddVersionDialogComponent} from '../../dialogs/add-version-dialog/add-version-dialog.component';
import {MatDialog, MatExpansionPanel, MatSnackBar} from '@angular/material';
import {IChartFilter} from '../../models/IChartFilter';
import {BasicCallChartComponent} from '../charts/basic-call-chart/basic-call-chart.component';
import {UrlUtil} from '../../_util/Url.util';
import {ShareObject} from '../../models/ShareObejct';
import {StringUtil} from '../../_util/String.util';
import {DateUtil} from '../../_util/Date.util';
import {LinkUtil} from '../../_util/Link.util';
import {ChartFilter} from '../../models/ChartFilter';

export const fadeAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({opacity: 0, transform: 'translateY(-10px)'}), stagger('60ms', animate('600ms ease-out', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })))],
      {optional: true}
    )
  ])
]);

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  animations: [fadeAnimation]
})
export class LinkComponent implements OnInit {
  public $link: Observable<ILink>;
  // TODO PAGINATION
  public $linkVersions: Observable<ILink[]>;

  public short: string;
  public chart: any;

  public baseUrl = UrlUtil.getApiDomain();

  public completeUrl = '';

  public chartFilter: IChartFilter;

  @ViewChild('chartRef', {static: true}) public chartRef: BasicCallChartComponent;
  @ViewChild('expansionPanel', {static: false}) public expansionPanelRef: MatExpansionPanel;

  constructor(private route: ActivatedRoute, private linkService: LinkService,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.short = params.l;
      this.completeUrl = UrlUtil.getApiDomain() + this.short;
    });

    this.chartFilter = new ChartFilter();
  }

  public ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
    this.$linkVersions = this.linkService.loadLinkVersions(this.short);
  }

  /**
   * Get date from creation date of passed link.<br/>
   * Returns actual day number between 1 and 31.
   *
   * @param link Link   Link to consider iat from
   *
   * @returns number    Day between 1 and 31
   */
  public getDay(link: ILink): number {
    return DateUtil.getDayByDate(new Date(link.iat));
  }

  /**
   * Get month abbreviation from creation date of passed link.
   *
   * @param link Link   Link to consider iat from
   */
  public getMonthName(link: ILink) {
    return DateUtil.getMonthAbbreviationByDate(new Date(link.iat));
  }

  /**
   * Open dialog to add a new version
   */
  public openAddVersionDialog(): void {
    const dialogRef = this.dialog
      .open(AddVersionDialogComponent,
        {
          id: 'add-version-dialog',
          width: '95%',
          maxWidth: '500px',
          height: 'auto',
          data: this.short,
        }
      );

    dialogRef.afterClosed()
      .subscribe(
        sLink => {
          // TODO can be better
          this.$link = this.linkService.loadLinkByShort(this.short);
          this.$linkVersions = this.linkService.loadLinkVersions(this.short);
        }
      );
  }

  // TODO DUPE SEE SUCCESSFUL CREATION DIALOG COMPONENT

  /**
   * Copy complete URL of currently created link to the users clipboard
   */
  public copyLinkToClipboard(): void {
    StringUtil.copyToClipboard(this.completeUrl);

    this.snackBar
      .open(
        'Link in die Zwischenablage kopiert', null,
        {
          duration: 2000,
          panelClass: 'snackbar-default'
        }
      );
  }

  /**
   * Open navigator.share element of users device.<br/>
   * Allows user to share set data via other apps.<br/>
   * If current device has not share option, copy created Link to clipboard instead.
   */
  public share(): void {
    setTimeout(() => {
      this.expansionPanelRef.close();
    });

    const navigator = window.navigator as any;

    if (navigator && navigator.share) {
      const shareObject = new ShareObject();
      shareObject.title = 'dein.li Kurzlink';
      shareObject.text = 'dein.li Kurzlink' + ' - ' + 'Hier, für dich: ';
      shareObject.url = this.completeUrl;

      navigator.share(shareObject)
        .then(
          () => this.snackBar.open('Link erfolgreich geteilt', null, {
            duration: 2000,
            panelClass: 'snackbar-default'
          })
        )
        .catch(
          () => this.copyLinkToClipboard()
        );
    } else {
      this.copyLinkToClipboard();
    }
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
