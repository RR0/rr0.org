import {Component, ContentChild, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NetService } from '../../Net.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rr0-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [NetService]
})
export class PageComponent implements OnInit {

  page: HTMLDocument;
  text: string;

    constructor(/*private route: ActivatedRoute, private netService: NetService, private router: Router*/) {
    console.log('PageComponent');
    /*this.route.params.subscribe(res => {
      let url: string = decodeURI(res.pageId);
      url = url.replace('-', '/');
      if (url && !url.startsWith('404')) {
        console.log(`Requested to serve page "${url}"`);
        this.netService.getPage(url)
          .subscribe(document => {
            this.page = <HTMLDocument>document;
            this.text = this.page.querySelector('.text').innerHTML;
            console.log('Read', document);
          }, error => {
            console.log(`Could not fetch ${url}`, error);
            router.navigate(['404'], { skipLocationChange: true });
          });
      }
    });*/
  }

  ngOnInit() {
  }

}
