import {Context, SelectorDirective} from "../common"
import {NavService} from "nav/nav"

export class LinkDirective extends SelectorDirective {

  constructor(private navigationService: NavService) {
    super("link")
  }

  protected async handle(context: Context, elem: HTMLElement): Promise<void> {
    const el = elem as HTMLLinkElement
    var rel = el.rel
    if (rel) {
      rel = rel.toLowerCase()
    }
    var text = el.title

    var link = el.href
    switch (rel) {
      case 'alternate':
        var alternatelang = el.hreflang
        break
      case 'prev':
        this.navigationService.setPrev(text, link)
        break
      case 'next':
        this.navigationService.setNext(text, link)
        break
      case 'start':
        this.navigationService.setStart(text, link)
        break
      case 'contents':
        this.navigationService.setContents(text, link)
        break
    }
  }
}
