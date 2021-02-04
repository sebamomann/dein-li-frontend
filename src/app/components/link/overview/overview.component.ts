import {Component, OnInit} from '@angular/core';
import {ILink} from '../../../models/ILink.model';
import {LinkService} from '../../../services/link.service';
import {Router} from '@angular/router';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

const staggerInms = 40;

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [
        style({opacity: 0, transform: 'translate(10px, 10px)'}),
        stagger(staggerInms + 'ms',
          sequence([
            animate('300ms ease-out',
              style({
                  opacity: 1,
                  transform: 'translate(0, 0)',
                }
              )
            ),
          ])
        )],
      {optional: true}
    ),
  ])
]);

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [listAnimation]
})
export class OverviewComponent implements OnInit {
  public filter = 'iat';
  public order = 'DESC';
  public limit = 10;
  public offset = 0;

  public links = [];
  public loaded = false;
  private refreshing = false;

  constructor(private linkService: LinkService, private router: Router) {
  }

  /**
   *
   */
  ngOnInit() {
    this.refreshData();
  }

  /**
   * Upon clicking a link, redirect to the analytics overview of this particular link
   *
   * @param link    Short link
   */
  public redirectToLink(link: ILink) {
    this.router.navigate(['/link'], {queryParams: {l: link.short}}).then(() => '');
  }

  /**
   * View direction changed
   */
  public changedOrder() {
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';

    this.changedFilter();
  }

  /**
   * Load new Data
   */
  public refreshData() {
    this.refreshing = true;

    this.linkService
      .loadLinks(this.filter, this.order, this.limit, this.offset)
      .subscribe((res: ILink[]) => {
        this.loaded = true;

        res.forEach((link) => {
          this.links.push(link);
        });

        setTimeout(() => {
          this.refreshing = false;
          
          if (!this.containerHasScrollBar()) {
            this.onScroll();
          }
        }, staggerInms * this.limit);
      });
  }

  /**
   * Load new data due to changed filter
   */
  public onScroll() {
    if (!this.refreshing) {

      this.offset += this.limit;

      this.refreshData();
    }
  }

  /**
   * Load new data due to changed filter
   */
  public changedFilter() {
    this.reset();
    this.refreshData();
  }

  /**
   * Tracking function for ngFor loop
   *
   * @param index   Index of current element
   * @param item    Current link in loop
   */
  public linkTrackBy(index: number, item: ILink) {
    if (!item) {
      return null;
    }

    return item.short;
  }

  /**
   * Check if window is scrollable
   */
  private containerHasScrollBar(): boolean {
    return document.body.scrollHeight > document.body.clientHeight;
  }

  /**
   * Reset pagination and elements array
   */
  private reset() {
    this.loaded = false;
    this.links = [];
    this.limit = 10;
    this.offset = 0;
  }
}
