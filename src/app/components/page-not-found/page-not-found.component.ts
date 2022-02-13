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
    this.route.queryParamMap.subscribe((params) => {
      if (/^\/([a-zA-Z0-9-_]+)\/?$/.test(this.router.url) && !params.get("isRedirect")) {
        console.log("REDIRECTING NGINX")
        this.document.location.href;
        window.open(this.router.url + "?isRedirect=true", "_self");
      }
    });
  }

}
