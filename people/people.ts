import common, {CommonModule, SelectorDirective} from "../src/common"
import rr0, {RR0Window} from "../src/index"
import nav, {NavModule} from "../src/nav/nav"

export class People {
  firstName: any
  lastName: string

  constructor(p) {
    const commaPos = p.indexOf(", ")
    if (commaPos > 0) {
      this.lastName = p.substring(0, commaPos)
      this.firstName = p.substring(commaPos + 2)
    } else {
      const namesSplitPos = p.lastIndexOf(' ')
      this.firstName = p.substring(0, namesSplitPos)
      this.lastName = p.substring(namesSplitPos + 1)
    }
    this.toString = function () {
      return this.firstName + ' ' + this.lastName
    }
  }
}

(<any>window).copyright = null

class AuthorCtrl {
  private authors: any[] = []
  private copyright: any
  private docTime: string

  constructor(peopleService: PeopleService) {
    this.authors = peopleService.getAuthors()
    this.copyright = peopleService.getCopyright()
    // this.docTime = timeService.toString(timeService.NewMoment(), timeService.getTime()).replacement
  }
}

export class PeopleService {
  authors = []
  copyright

  constructor(private commonsService, private peopleRoot) {
  }

  getCopyright() {
    return this.copyright
  }

  getAuthors() {
    return this.authors
  }

  setAuthor(a, aLink) {
    if (a) {
      const author = this.setPName(a)
      author.link = this.peopleLink(a, aLink)
      this.authors.push(author)
    }
  }

  setCopyright(c, cLink) {
    this.copyright = (window as unknown as RR0Window).copyright = c
  }

  addAuthor(a, aLink, c, cLink) {
    if (a) {
      this.setAuthor(a, aLink)
    }
    if (c) {
      this.setCopyright(c, cLink)
    }
  }

  setPeopleName(name) {
    this.setPName(name)
  }

  /**
   * @param {String} p People's name
   * @param {String} [pLink] a href link, or a symbolic link, or null
   */
  peopleLink(p, pLink) {
    if (p) {
      if (!pLink) {
        pLink = common.service.cache[p]
        if (!pLink) {
          this.setPName(p)
          pLink = common.service.cache[this.getPeople().lastName]
          if (!pLink) {
            p = (this.getPeople().lastName + this.getPeople().firstName)
            pLink = this.commonsService.validLink(p)
          } else {
            return pLink
          }
        } else {
          return pLink
        }
      }
      const firstLinkChar = pLink.charAt(0)
      if (firstLinkChar !== '.' && firstLinkChar !== '/') {
        pLink = this.peopleRoot + firstLinkChar.toLowerCase() + "/" + pLink
      }
      pLink = this.commonsService.validLink(pLink)
      common.service.cache[p] = pLink
      common.service.cache[this.getPeople().lastName] = pLink
    } else {
      pLink = null
    }
    return pLink
  }

  getPeople() {
    return rr0.context.people
  }

  private setPName(name) {
    if (name && name.length > 0) {
      rr0.context.people = new People(name)
      return rr0.context.people
    }
  }
}

export class PeopleModule {
  peoples = {}
  peopleRoot = "/people/"
  service: PeopleService
  private authorCtrl: AuthorCtrl

  constructor(nav: NavModule, common: CommonModule) {
    const commonService = common.service
    this.service = new PeopleService(commonService, this.peopleRoot)
    const self = this
    common.directives.push(new class extends SelectorDirective {
      protected handle(elem: HTMLElement) {
        self.handleWitness(null, elem)
      }
    }(".temoin"))
    common.directives.push(new class extends SelectorDirective {
      protected handle(elem: HTMLElement) {
        self.handleWitness(1, elem)
      }
    }(".temoin1"))
    common.directives.push(new class extends SelectorDirective {
      protected handle(elem: HTMLElement) {
        self.handleWitness(2, elem)
      }
    }(".temoin2"))
    common.directives.push(new class extends SelectorDirective {
      protected handle(elem: HTMLElement) {
        self.handleWitness(3, elem)
      }
    }(".temoin3"))
    this.authorCtrl = new AuthorCtrl(this.service)

    const navigationService = nav.service
    nav.headController.titleHandlers.push(this.titleFromPeople.bind(this))
    navigationService.addStart({
        dir: this.peopleRoot,
        label: "<i class='fa fa-user'></i> <span class='label'>Personnes</span></span>",
        title: "Personnes"
      }
    )

    commonService.nounToLink(this.peopleRoot + "pilotes.html", "pilote")
    commonService.nounToLink(this.peopleRoot + "ufologues.html", "ufologue")
    commonService.nounToLink(this.peopleRoot + "Astronomes.html", "astronome")
    commonService.nounToLink(this.peopleRoot + "temoins.html", "temoin")
  }

  private titleFromPeople() {
    let title
    const p = this.service.getPeople()
    if (p) {
      title = p.toString()
    }
    return title
  }

  handleWitness(witnessId: number, elem: HTMLElement) {
    'use strict'
    const txt = elem.innerText
    elem.style.width = txt.length + 'em'
    const tint = 50 + (witnessId * 10)
    const caviarBackgroundColor = `rgb(${tint}, ${tint}, ${tint})`
    elem.style.background = `linear-gradient(left, white, ${caviarBackgroundColor} 2%, ${caviarBackgroundColor} 98%, white);`
    elem.innerHTML = `<a href="/FAQ.html#privacy">témoin${witnessId ? ` ${witnessId}` : ''}</a>`
    elem.title = 'Nom du témoin anonymisé'
    if (elem.id) {
      elem.innerHTML += ` ${elem.id}`
    }
  }
}

const people = new PeopleModule(nav, common)
export default people
