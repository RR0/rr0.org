import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: './PageNotFound.component.html'
})
export class PageNotFoundComponent {
  constructor(private router: Router) {
    console.log('page ' + router.url + ' not found');
  }
}
