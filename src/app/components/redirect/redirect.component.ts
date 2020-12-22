import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params.error === 'not_found') {
        this.router.navigate(['/redirect/notFound'], {
          skipLocationChange: true,
          queryParamsHandling: 'preserve'
        });
      } else if (params.error === 'locked') {
        this.router.navigate(['/redirect/locked'], {
          skipLocationChange: true,
          queryParamsHandling: 'preserve'
        });
      } else {
        this.router.navigate(['/redirect/unknown'], {
          skipLocationChange: true,
          queryParamsHandling: 'preserve'
        });
      }
    });
  }

  ngOnInit() {
  }

}
