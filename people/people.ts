import common, {CommonModule, directives, org} from "../src/common"
import {RR0Window} from "../src/index"
import time, {TimeModule, TimeService} from "../time/time"
import nav, {NavModule} from "../src/nav/nav"
import {SelectorDirective} from "../src/note/foot"

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
        pLink = org.cache[p]
        if (!pLink) {
          this.setPName(p)
          pLink = org.cache[this.getPeople().lastName]
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
      org.cache[p] = pLink
      org.cache[this.getPeople().lastName] = pLink
    } else {
      pLink = null
    }
    return pLink
  }

  getPeople() {
    return org.rr0.context.people
  }

  private setPName(name) {
    if (name && name.length > 0) {
      org.rr0.context.people = new People(name)
      return org.rr0.context.people
    }
  }
}

export class PeopleModule {
  peoples = {}
  peopleRoot = "/people/"
  service: PeopleService
  private authorCtrl: AuthorCtrl

  constructor(nav: NavModule, common: CommonModule, time: TimeModule) {
    const commonService = common.service
    const timeService = time.service
    this.service = new PeopleService(commonService, this.peopleRoot)
    const self = this
    directives.push(new class extends SelectorDirective {
      protected handle(elem: HTMLElement) {
        self.handleWitness("", elem)
      }
    }(".temoin"))
    directives.push(new class extends SelectorDirective {
      protected handle(elem: HTMLElement) {
        self.handleWitness("1", elem)
      }
    }(".temoin1"))
    directives.push(new class extends SelectorDirective {
      protected handle(elem: HTMLElement) {
        self.handleWitness("2", elem)
      }
    }(".temoin2"))
    directives.push(new class extends SelectorDirective {
      protected handle(elem: HTMLElement) {
        self.handleWitness("3", elem)
      }
    }(".temoin3"))
    this.authorCtrl = new AuthorCtrl(this.service, timeService)

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

  handleWitness(witnessId, elem) {
    'use strict'
    const txt = elem.text()
    const e = elem[0]
    e.style.width = txt.length + 'em'
    const tint = 50 + (witnessId * 10)
    const caviarBackgroundColor = "rgb(" + tint + ", " + tint + ", " + tint + ")"
    e.style.background = 'linear-gradient(left, white, ' + caviarBackgroundColor + ' 2%, ' + caviarBackgroundColor + ' 98%, white);'
    e.innerHTML = '<a href="/FAQ.html#privacy">témoin' + (witnessId ? ' ' + witnessId : '') + '</a>'
    e.title = 'Nom du témoin anonymisé'
    if (e.id) {
      e.innerHTML += ' ' + e.id
    }
  }
}

const people = new PeopleModule(nav, common, time)
export default people

class AuthorCtrl {
  private authors: any[]
  private copyright: any
  private docTime: string

  constructor(peopleService: PeopleService, timeService: TimeService) {
    this.authors = peopleService.getAuthors()
    this.copyright = peopleService.getCopyright()
    this.docTime = timeService.toString(timeService.NewMoment(), timeService.getTime()).replacement
  }
}
