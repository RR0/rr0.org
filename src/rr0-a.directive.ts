/**
 * Adds "target=_blank" to external links so they will be opened in separate tabs
 */
import {SelectorDirective} from "common"

export class AnchorDirective extends SelectorDirective {

  constructor(private host: string) {
    super("a")
  }

  protected handle(elem: HTMLAnchorElement) {
    // const path = e.pathname + e.hash;
    // console.log('href', e.href, path)
    if (elem.hostname && elem.hostname.indexOf('.') > 0 && elem.hostname !== this.host) {
      elem.setAttribute("target", "_blank")
    }
  }
}
