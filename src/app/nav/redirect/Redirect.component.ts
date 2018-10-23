import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: 'Redirecting...'
})
export class RedirectComponent {
  constructor(private router: Router) {
    console.log('Could not find route for ' + router.url);
    let redirectUrl = router.url;
    if (redirectUrl.charAt(0) === '/') {
      redirectUrl = redirectUrl.substring(1);
    }
    redirectUrl = redirectUrl.replace('/', '-');
    console.log(`Redirecting to "/p/${redirectUrl}"`);
    router.navigate(['p', redirectUrl]);
  }
}
