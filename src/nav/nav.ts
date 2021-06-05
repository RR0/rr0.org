import {CommonModule, CommonService, Context} from "../common"
import {LangModule} from '../lang'
import {AnchorDirective} from "../rr0-a.directive"
import {Moment} from "../../time/Moment"
import {HeadController} from "./HeadController"

export class NavLink {
  constructor(readonly label: string, readonly link: string, readonly title?: string) {
  }
}

interface Start {
  dir: string
  label: string
  title?: string
  css?: string
  js?: string
  onLoad?: string
}

export class NavService {
  startNav: NavLink
  contentsURL: any
  contents: any
  next: string
  nextLink: string
  prev: string
  prevLink: string
  navList: any
  starts: Start[] =
    [
      {
        dir: "/tech/info/",
        label: "Informatique",
        css: "/js/pretty/prettify.css",
        js: "/js/pretty/prettify.js",
        onLoad: "prettyPrint()"
      },
      {
        dir: "/science/crypto/ufo/",
        label: "Ufologie"
      },
      {
        dir: "/science/crypto/zoo/",
        label: "Cryptozoologie"
      },
      {
        dir: "/science/crypto/archeo/",
        label: "Cryptoarch\xE9ologie"
      },
      {
        dir: "/science/para/psi/",
        label: "Parapsychologie"
      },
      {
        dir: "/science/para/",
        label: "Parasciences"
      },
      {
        dir: "/science/crypto/",
        label: "Cryptosciences"
      },
      {
        dir: "/science/sur/fantome",
        label: "Fant\xF4mes"
      },
      {
        dir: "/science/sur/",
        label: "Surnaturel"
      },
      {
        dir: "/science/",
        label: "Science"
      },
      {
        dir: "/tech/",
        label: "Technique"
      },
      {
        dir: "/croyance/conspirationnisme/",
        label: "Conspirationnisme"
      },
      {
        dir: "/croyance/",
        label: "Croyance"
      },
      {
        dir: "/org/",
        label: "<i class='fa fa-sitemap'></i> <span class='label'>Organisations</span></span>",
        title: "Organisations"
      },
      {
        dir: "/politique/",
        label: "Politique"
      }
    ]
  currentLevel = 1
  prevHandlers: ((t: Moment, nextLink, next) => NavLink)[] = []
  nextHandlers: ((t: Moment, nextLink, next) => NavLink)[] = []

  constructor(private commonsService: CommonService, private root: ParentNode) {
  }

  getNavList() {
    if (!this.navList) {
      const n = this.root.querySelector("nav")
      this.navList = n.querySelector('ul')
    }
    return this.navList
  }

  addRel(l?: string, t?: string) {
    const rel = document.createElement("link")
    rel.setAttribute("rel", t)
    rel.setAttribute("href", l)
    this.commonsService.addToHead(rel)
  }

  setPrev(p?: string, pLink?: string) {
    if (pLink) {
      this.prevLink = pLink
    }
    if (p) {
      this.prev = p
    }
  }

  setNext(n?: string, nLink?: string) {
    if (n) {
      this.next = n
    }
    if (nLink) {
      this.nextLink = nLink
    }
  }

  async getNext(context: Context): Promise<NavLink> {
    let nn: NavLink
    if (!this.nextLink && !this.next) {
      for (let nextHandler of this.nextHandlers) {
        nn = nextHandler(context.time, this.nextLink, this.next)
        if (nn) {
          break
        }
      }
    }
    if (!nn) {
      if (this.next && this.nextLink) {
        nn = new NavLink(this.next, this.nextLink)
      } else {
        nn = null
      }
    }
    return nn
  }

  /**
   * Determine the "previous" link, if any.
   *
   * @returns {Promise<NavLink>}
   */
  async getPrev(context: Context): Promise<NavLink> {
    let pp: NavLink
    let previousSpecified = this.prevLink || this.prev
    if (!previousSpecified) {
      for (let nextHandler of this.prevHandlers) {
        pp = nextHandler(context.time, this.prevLink, this.prev)
        if (pp) {
          break
        }
      }
    }
    if (!pp) {
      if (this.prev && this.prevLink) {
        pp = new NavLink(this.prev, this.prevLink)
      } else {
        pp = null
      }
    }
    return pp
  }

  getPrevLink() {
    return this.prevLink
  }

  getNextLink() {
    return this.nextLink
  }

  addStart(s) {
    this.starts.push(s)
  }

  setContents(c?: string, cLink?: string) {
    if (!this.contents) {
      this.contents = c
      this.contentsURL = cLink
      // addRel(contentsURL, "Contents");
    }
  }

  setStart(s?: string, sLink?: string) {
    if (!this.startNav) {
      let ret = null
      let t
      if (window === top) {
        if (!s) {                       // Look for start induced by URI
          const uri = this.commonsService.getUri()
          for (let i = 0; i < this.starts.length; i++) {
            const st: Start = this.starts[i]
            const dataPos = uri.indexOf(st.dir)
            if (dataPos >= 0 && uri !== st.dir) {
              s = st.label
              t = st.title
              sLink = st.dir
              if (st.css) {
                this.commonsService.loadCSS(st.css)
              }
              if (st.js) {
                this.commonsService.loadJS(st.js)
              }
              if (st.onLoad) {
                ret = st.onLoad
              }
              break
            }
          }
        }
        if (!t) {
          t = "D\xE9but"
        }
        this.startNav = new NavLink(s, sLink, t)
      }
      return ret
    }
  }

  getContents() {
    return this.contents
  }

  getContentsURL() {
    return this.contentsURL
  }

  getStartNav(): NavLink {
    return this.startNav
  }
}

function handleUrlRedirect() {
  'use strict'
  return null
  /*  var path = location.pathname;
   if (path.indexOf('index.new') < 0) {
   location.href = '/index.new.html?p=' + path;
   path = null;
   } else {
   path = location.search.substring(location.search.indexOf('?p=') + 3);
   }
   return path;*/
}

function pageContents(template) {
  'use strict'
  const startMark = '<div class="text">'
  const startIndex = template.indexOf(startMark)
  const endMark = '</div><!--text-->'
  const endIndex = template.indexOf(endMark)
  const templateContents = template.substring(startIndex + startMark.length, endIndex)
  return templateContents
}

export class NavModule {
  host = location.host
  hiddenPos = '-100em'
  readonly service: NavService
  headController: HeadController

  constructor(common: CommonModule, lang: LangModule, private root: ParentNode) {
    this.service = new NavService(common.service, root)
    common.directives.push(new AnchorDirective(this.host))
    this.headController = new HeadController(common.service, lang.service, this.service, common.service.constantClass, this.root)
  }
}
