import {Context, SelectorDirective} from "../src/common"
import {PeopleService} from "./people"

interface CopyrightScope {
  name: string;
  defaultName: string;
}

export class CopyrightDirective extends SelectorDirective {

  constructor(private peopleService: PeopleService) {
    super(".copyright")
  }

  protected async handle(context: Context, el: HTMLElement): Promise<void> {
    const defaultName = el.dataset.defaultName
    const url = el.dataset.url
    const copyright = this.peopleService.getCopyright()
    const name = copyright ? copyright : defaultName
    el.innerHTML = `<a href="${url}">Copyright &copy; ${name}</a>`
  }
}
