import {CommonService, Context, SelectorDirective} from "../src/common"
import {PeopleService} from "./people"

interface PeopleScope {
  id: string;
  href: string;
  people: {
    name: string;
  };
}

export class PeopleClassDirective extends SelectorDirective {

  constructor(private commonService: CommonService, private peopleService: PeopleService) {
    super(".people")
  }

  protected async handle(context: Context, el: HTMLElement) {
    // const id = 'people' + scope.id
    const txt = this.commonService.text(el)
    const nameKey = el.title     // Alternate (correct for link) name?
    let peopleName = txt
    if (peopleName.length <= 0) {
      peopleName = nameKey
      el.innerText = peopleName
    }
    const href = this.peopleService.peopleLink(context, nameKey ? nameKey : peopleName)
    el.innerHTML = `<a href="${href}" translate="no">${el.innerHTML}</a>`
  }
}

export class PeopleAttributeDirective extends SelectorDirective {
  constructor(private peopleService: PeopleService) {
    super("*[people]")
  }

  async handle(context: Context, el: HTMLElement): Promise<void> {
    // scope.id = 'people' + scope.id
    const people = context.people
    const txt = people.name
    const nameKey = el.title     // Alternate (correct for link) name?
    let peopleName = txt
    if (peopleName.length <= 0) {
      peopleName = nameKey
      el.innerText = peopleName
    }
    const href = this.peopleService.peopleLink(context, nameKey ? nameKey : peopleName)
    el.innerHTML = `<a href="${href}" translate="no">${people.name}</a>`
  }
}
