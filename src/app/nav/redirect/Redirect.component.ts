import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  template: 'Redirecting...'
})
export class RedirectComponent {
  constructor(private router: Router) {
    console.log('page ' + router.url + ' not found');
    let redirectUrl = router.url;
    if (redirectUrl.charAt(0) === '/') {
      redirectUrl = redirectUrl.substring(1);
    }
    router.navigate(['p', redirectUrl]);
  }
}
