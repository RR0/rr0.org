import {CommonModule, CommonService, Context, SelectorDirective} from "../src/common"
import {NavModule} from "../src/nav/nav"
import {Rr0Context, RR0Window} from "../src/rr0"
import {PeopleAttributeDirective, PeopleClassDirective} from "./rr0-people"

export class People {
  firstName: any
  lastName: string

  constructor(p: string) {
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

  constructor(private commonService: CommonService, private peopleRoot) {
  }

  getCopyright() {
    return this.copyright
  }

  getAuthors() {
    return this.authors
  }

  setAuthor(context: Context, a: string, aLink: string) {
    if (a) {
      const author = (context as Rr0Context).setPName(a)
      author.link = this.peopleLink(context, a, aLink)
      this.authors.push(author)
    }
  }

  setCopyright(c: string, cLink: string) {
    this.copyright = (window as unknown as RR0Window).copyright = c
  }

  addAuthor(context: Context, a: string, aLink: string, c: string, cLink: string) {
    if (a) {
      this.setAuthor(context, a, aLink)
    }
    if (c) {
      this.setCopyright(c, cLink)
    }
  }

  /**
   * @param context
   * @param {String} p People's name
   * @param {String} [pLink] a href link, or a symbolic link, or null
   */
  peopleLink(context: Context, p: string, pLink?: string) {
    if (p) {
      const people = context.people
      if (!pLink) {
        pLink = this.commonService.cache[p]
        if (!pLink) {
          (context as Rr0Context).setPName(p)
          pLink = this.commonService.cache[people.lastName]
          if (!pLink) {
            p = (people.lastName + people.firstName)
            pLink = this.commonService.validLink(p)
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
      pLink = this.commonService.validLink(pLink)
      this.commonService.cache[p] = pLink
      this.commonService.cache[people.lastName] = pLink
    } else {
      pLink = null
    }
    return pLink
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
    common.directives.push(new PeopleClassDirective(commonService, this.service))
    common.directives.push(new PeopleAttributeDirective(this.service))
    common.directives.push(new class extends SelectorDirective {
      protected async handle(context: Context, el: HTMLElement) {
        self.handleWitness(null, el)
      }
    }(".temoin"))
    common.directives.push(new class extends SelectorDirective {
      protected async handle(context: Context, el: HTMLElement) {
        self.handleWitness(1, el)
      }
    }(".temoin1"))
    common.directives.push(new class extends SelectorDirective {
      protected async handle(context: Context, el: HTMLElement) {
        self.handleWitness(2, el)
      }
    }(".temoin2"))
    common.directives.push(new class extends SelectorDirective {
      protected async handle(context: Context, el: HTMLElement) {
        self.handleWitness(3, el)
      }
    }(".temoin3"))
    this.authorCtrl = new AuthorCtrl(this.service)

    const navigationService = nav.service
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
