import people, {PeopleService} from "./people"
import common, {SelectorDirective} from "common"
import nav, {HeadController} from "nav/nav"

export interface MetaScope {
  titleUrl: string;
}

class MetaDirective extends SelectorDirective {

  constructor(private peopleService: PeopleService, private headController: HeadController) {
    super("meta")
  }

  protected handle(el: HTMLElement) {
    var name = el.getAttribute("name")
    var content = el.getAttribute("content")
    var urlPos = content.indexOf(';url=')
    var link = urlPos > 0 ? content.substring(urlPos) : undefined
    switch (name) {
      case 'url':
        this.headController.titleUrl = content
        break
      case 'author':
        this.peopleService.setAuthor(content, link)
        break
      case 'copyright':
        this.peopleService.setCopyright(content, link)
        break
    }
  }
}

common.directives.push(new MetaDirective(people.service, nav.headController))
