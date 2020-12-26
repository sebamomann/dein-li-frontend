import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-link-router',
  templateUrl: './link-router.component.html',
  styleUrls: ['./link-router.component.scss']
})
export class LinkRouterComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params.l === undefined) {
        this.router.navigate(['/link/overview'], {
          skipLocationChange: true,
          queryParamsHandling: 'preserve'
        });
      } else {
        if (params.type === 'preview') {
          this.router.navigate(['/link/preview'], {
            skipLocationChange: true,
            queryParamsHandling: 'preserve',
            queryParams: {
              l: params.l
            }
          });
        } else {
          this.router.navigate(['/link/specific'], {
            skipLocationChange: true,
            queryParamsHandling: 'preserve',
            queryParams: {
              l: params.l
            }
          });
        }
      }
    });
  }

  ngOnInit() {
  }

}
