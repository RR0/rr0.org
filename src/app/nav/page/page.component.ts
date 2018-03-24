import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetService} from '../../Net.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [NetService]
})
export class PageComponent implements OnInit {

  page: HTMLDocument;
  text: string;

  constructor(private route: ActivatedRoute, private netService: NetService, private router: Router) {
    this.route.params.subscribe(res => {
      const url: string = decodeURI(res.pageId);
      console.log('url', url);
      if (url) {
        this.netService.getPage(url)
          .subscribe(document => {
            this.page = document;
            this.text = this.page.querySelector('.text').innerHTML;
            console.log('template', document);
          }, error => {
            router.navigate(['404', error]);
          });
      }
    });
  }

  ngOnInit() {
  }

}
