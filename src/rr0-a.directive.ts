/**
 * Adds "target=_blank" to external links so they will be opened in separate tabs
 */
import {SelectorDirective} from "common"

export class AnchorDirective extends SelectorDirective {
  constructor() {
    super("a")
  }

  protected handle(elem: HTMLAnchorElement) {
    console.log('handling ' + elem)
    // const path = e.pathname + e.hash;
    // console.log('href', e.href, path)
    if (elem.hostname && elem.hostname.indexOf('.') > 0 && elem.hostname !== location.host) {
      elem.target = '_blank'
    }
  }
}
