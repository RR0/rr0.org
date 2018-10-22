import { Directive, ElementRef } from '@angular/core';

/**
 * Adds "target=_blank" to external links so they will be opened in separate tabs
 */
@Directive({
  selector: 'a'
})
export class AnchorDirective {
  constructor(private el: ElementRef) {
    console.log('handling ' + el.nativeElement);
    const e: any = el.nativeElement;
    const path = e.pathname + e.hash;
    //console.log('href', e.href, path)
    if (e.hostname && e.hostname.indexOf('.') > 0 && e.hostname !== location.host) {
      e.target = '_blank';
    }
  }
}