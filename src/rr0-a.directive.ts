import {Context, SelectorDirective} from "./common"

/**
 * Adds "target=_blank" to external links so they will be opened in separate tabs
 */
export class AnchorDirective extends SelectorDirective<HTMLAnchorElement> {

  constructor(private host: string) {
    super("a")
  }

  protected async handle(context: Context, el: HTMLAnchorElement) {
    // const path = e.pathname + e.hash;
    // console.log('href', e.href, path)
    if (el.hostname && el.hostname.indexOf('.') > 0 && el.hostname !== this.host) {
      el.setAttribute("target", "_blank")
    }
  }
}
