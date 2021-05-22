import people, {PeopleService} from "./people"
import common, {Context, SelectorDirective} from "common"
import nav from "nav/nav"
import {HeadController} from "nav/HeadController"

export interface MetaScope {
  titleUrl: string;
}

class MetaDirective extends SelectorDirective {

  constructor(private peopleService: PeopleService, private headController: HeadController) {
    super("meta")
  }

  protected async handle(context: Context, el: HTMLElement) {
    const name = el.getAttribute("name")
    const content = el.getAttribute("content")
    const urlPos = content.indexOf(';url=')
    const link = urlPos > 0 ? content.substring(urlPos) : undefined
    switch (name) {
      case 'url':
        this.headController.titleUrl = content
        break
      case 'author':
        this.peopleService.setAuthor(context, content, link)
        break
      case 'copyright':
        this.peopleService.setCopyright(content, link)
        break
    }
  }
}

common.directives.push(new MetaDirective(people.service, nav.headController))
