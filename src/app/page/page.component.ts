import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [ActivatedRoute]
})
export class PageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(res => {
      const url: string = res.id;
      if (url) {
        console.log('loading ' + url);
        return this.http.get<any>(url).subscribe(response => {
          const template = response.data;
          console.log('template', response);
        });
      }
    });
  }

  ngOnInit() {
  }

}
