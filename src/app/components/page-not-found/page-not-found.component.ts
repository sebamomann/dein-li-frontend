import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private router: Router, @Inject(DOCUMENT) private document, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    const params = await this.route.queryParamMap.toPromise();
    console.log(params.get("isRedirect"));
    if (/^\/([a-zA-Z0-9-_]+)\/?$/.test(this.router.url) && !params.get("isRedirect")) {
      console.log("lol")
      this.document.location.href;
      window.open(this.document.location.href + this.router.url + "?isRedirect=true");
    }
  }

}
