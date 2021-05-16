import {Moment} from "../time/Moment"

export class Context {
  language = this.user.language.substring(0, 2)
  time: Moment = null
  place = null
  people = null

  constructor(private user: User) {
  }
}


export abstract class SelectorDirective<E extends HTMLElement = HTMLElement> {
  constructor(private selector: string) {
  }

  async execute(context: Context, from: ParentNode = document) {
    const els = from.querySelectorAll(this.selector)
    const promises = []
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      promises.push(this.handle(context, el as E))
    }
    await Promise.all(promises)
  }

  protected abstract handle(context: Context, el: E): Promise<void>
}

export class User {
  language = navigator.language || (<any>navigator).userLanguage || (<any>navigator).browserLanguage || (<any>navigator).systemLanguage
}

declare var prettyPrintOne: any

/**
 * requestAnimationFrame() shim by Paul Irish.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
(function () {
  'use strict'

  let lastTime = 0
  const vendors = ['webkit', 'moz']
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currTime - lastTime))
      const id = window.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id

    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}())

export class CommonService {
  docUri: string
  /**
   * Elements of this class won't be modified.
   *
   * @type {String}
   */
  constantClass = "constant"
  readonly wordSeparators = ".,\':!?;+=\"()[]/°%*&$#\n"
  readonly nonPlurals = ["les", "des", "ces", "ses", "dans"/*, "mes", "leur", "son", "sa", "ma", "ta", "ton"*/]
  pageCache = {}
  cache = sessionStorage ? sessionStorage : this.pageCache
  log: any
  private readonly debug: boolean

  constructor() {
    this.debug = window.location.href.indexOf("?debug") >= 0

    if (this.debug && typeof console !== 'undefined') {
      this.log = window.console
    } else {
      this.log = (m) => {
      }
    }

// Add a getElementsByClassName function if the browser doesn't have one
// Limitation: only works with one class name
// Copyright: Eike Send http://eike.se/nd
// License: MIT License
    if (!document.getElementsByClassName) {
      (<any>document).getElementsByClassName = function (search: string): any[] {
        const d = document
        let elements
        let pattern
        let i
        const results = []
        if (d.querySelectorAll) { // IE8
          return <any>d.querySelectorAll("." + search)
        }
        if (d.evaluate) { // IE6, IE7
          pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]"
          elements = d.evaluate(pattern, d, null, 0, null)
          while ((i = elements.iterateNext())) {
            results.push(i)
          }
        } else {
          elements = d.getElementsByTagName("*")
          pattern = new RegExp("(^|\\s)" + search + "(\\s|$)")
          for (i = 0; i < elements.length; i++) {
            if (pattern.test(elements[i].className)) {
              results.push(elements[i])
            }
          }
        }
        return results
      }
    }
  }

  hasClass(e, c) {
    const className = e.className
    let found = !!className
    if (className) {
      const pos = className.indexOf(this.constantClass) < 0 && className.indexOf(c)
      found = pos >= 0
      if (found) {
        const lastChar = className.charCodeAt(pos + c.length)
        found = isNaN(lastChar) || lastChar === 0x20
      }
    }
    return found
  }

  isNumber(o) {
    return o && !isNaN(o - 0)
  }

  addToElementType(n, e) {
    document.getElementsByTagName(n)[0].appendChild(e)
  }

  addToHead(e) {
    this.addToElementType("head", e)
  }

  arrayIndex(w, a) {
    w = w.toLowerCase()
    let u
    for (u = 0; u < a.length; u++) {
      if (w === a[u].toLowerCase()) {
        break
      }
    }
    return u < a.length ? u + 1 : null
  }

  wordBefore(txt, b) {
    let c
    while (b >= 0 && this.wordSeparators.indexOf((c = txt.charAt(b))) < 0 && c !== ' ') {    // Pass current word
      b--
    }
    while (b > 0 && txt.charAt(b) === ' ') {    // Pass next spaces
      b--
    }
    let w = ""
    while (b >= 0 && this.wordSeparators.indexOf((c = txt.charAt(b--))) < 0 && c !== ' ') {  // Add next non separators
      w = c + w
    }
    return w
  }

  wordAfter(txt, b) {
    let c
    while (b < txt.length && this.wordSeparators.indexOf((c = txt.charAt(b))) < 0 && c !== ' ') {    // Pass current word
      b++
    }
    while (b < txt.length && txt.charAt(b) === ' ') {   // Pass next spaces
      b++
    }
    let w = ""
    while (b < txt.length && this.wordSeparators.indexOf((c = txt.charAt(b++))) < 0 && c !== ' ') {  // Add next non separators
      w += c
    }
    return w
  }

  isProperName(w) {
    const firstChar = w.charAt(0)
    return firstChar >= 'A' && firstChar <= 'Z'
  }

  isPlural(w) {
    return w.charAt(w.length - 1) === 's'
  }

  isProNoun(w) {
    return this.arrayIndex(w, this.nonPlurals)
  }

  clone(o) {
    return Object.assign({}, o)
  }

  stripText(txt) {
    txt = txt.replace(/'/g, "'")
    txt = txt.replace(/\"/g, '"')
    txt = txt.replace(/\n/g, '')
    txt = txt.replace(/\s+/g, ' ')
    return txt
  }

  strip(e) {
    const txt = this.text(e)
    return this.stripText(txt)
  }

  /**
   * Creates a new DOM element.
   *
   * @param t Element's name/type
   * @param e The element's contents
   * @returns {HTMLElement}
   */
  newElement(t, e) {
    const ne = document.createElement(t)
    if (e) {
      ne.appendChild(e)
    }
    return ne
  }

  /**
   * Creates a new span element.
   *
   * @param c The span class(es) name(s).
   * @param e The span contents.
   * @returns {HTMLElement}
   */
  spanElement(c, e) {
    const se = this.newElement("span", e)
    if (c) {
      se.setAttribute("class", c)
    }
    return se
  }

  linkStart(l, t) {
    let sp = `<a href="${this.validLink(l)}"`
    if (t) {
      sp += ` title="${t}"`
    }
    return `${sp}>`
  }

  /**
   * Creates an hyperlink DOM element.
   *
   * @param a The URI
   * @param e The link contents (text) node
   * @param t The link hover tooltip (title)
   * @returns {HTMLElement}
   */
  linkElement(a, e, t?) {
    let le
    if (a) {
      le = this.newElement("a", e)
      le.setAttribute("href", a)
    } else {
      le = this.spanElement(null, e)
    }
    if (t) {
      le.setAttribute("title", t)
    }
    return le
  }

  link(l, contents, t) {
    return this.linkStart(l, t) + contents + "</a>"
  }

//var cache = pageCache;
  toLink(l, k) {
    l = this.addEndingSlash(l)
    this.log("caching " + k + " as " + l)
    this.cache[k] = l
  }

  toLinks(l, kk) {
    for (let k = 0; k < kk.length; k++) {
      this.toLink(l, kk[k])
    }
  }

  nounsToLink(l, kk) {
    for (let k = 0; k < kk.length; k++) {
      this.nounToLink(l, kk[k])
    }
  }

  textValue(e) {
    let v = e.nodeValue
    if (v && e.nodeType === Node.TEXT_NODE) {
      v = v.trim().replace(/\n/g, '')
      v = v.replace(/ +(?= )/g, '')
      if (v.length === 0 || e.parentNode.nodeName === 'A' || this.hasClass(e.parentNode, this.constantClass)) {
        v = null
      }
    }
    /* && !hasClass(e.parentNode, "people") /* && !e.hasChildNodes() && e.className !== constantClass && (e.tagName === "P" || e.tagName === "LI" || e.tagName === "CAPTION" || (e.tagName === "TD" && !e.hasChildNodes()));*/
    return v
  }

  /**
   * Walk a node and its child nodes to apply a proc on them.
   *
   * @param e the first node to walk from.
   * @param proc The proc to execute on it and its child nodes.
   */
  walk(e, proc) {
    if (e) {
      const childNodes = e.childNodes
      for (let i = 0; i < childNodes.length; i++) {
        this.walk(childNodes[i], proc)
      }
      proc(e)
    }
  }

  text(e) {
    let txt = e.textContent
    if (txt === undefined) {
      txt = e.innerText  // IE8-
    }
    txt = txt.replace('\n', ' ')
    return txt
  }

  nounToLink(l, k) {
    this.toLinks(l, [k + "s", k])     // Plural as well
  }

  addEndingSlash(l) {
    let lastSlash = l.length - 1
    for (; lastSlash > 0; lastSlash--) {
      const c = l.charAt(lastSlash)
      if (c === '.') {
        break
      } else if (c === '/') {
        if (lastSlash !== l.length - 1) {
          l += '/'
        }
        break
      }
    }
    return l
  }

  getUri() {
    if (!this.docUri) {
      this.docUri = window.location.pathname
    }
    return this.docUri
  }

  validLink(l) {
    this.log('validLink(' + l + ')')
    l = l.replace(/\n/g, ' ')
      .replace(/(\u00E0|\u00E1|\u00E2|\u00E4)/g, 'a')
      .replace(/\u00E7/g, 'c')
      .replace(/(\u00E8|\u00E9|\u00EA|\u00EB)/g, 'e')
      .replace(/(\u00EE|\u00EF)/g, 'i')
      .replace(/\u00F1/g, 'n')
      .replace(/(\u00F4|\u00F6|\u00F8)/g, 'o')
      .replace(/(\u00F9|\u00FB|\u00FC|\u00FA)/g, 'u')
      .replace(/[\. ,'\-]/g, '')
    return l
  }

  zero(v) {
    return v < 10 ? '0' + v : v
  }

  loadCSS(filename) {
    const e = document.createElement("link")
    e.setAttribute("rel", "stylesheet")
    e.setAttribute("type", "text/css")
    e.setAttribute("href", filename)
    this.addToHead(e)
  }

  loadJS(filename) {
    const e = document.createElement('script')
//    e.setAttribute("type", "text/javascript");
    e.setAttribute("src", filename)
    this.addToHead(e)
  }

  parentLink(l: string) {
    let parentL = l
    if (l.charAt(l.length - 1) === '/') {
      parentL = parentL.substring(0, parentL.length - 1)
    }
    let i: number
    for (i = parentL.length - 1; i > 0 && parentL.charAt(i) !== '/';) {
      i--
    }
    if (i > 0) {
      parentL = parentL.substring(0, i)
    }
    return parentL
  }

  capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  camelize(s, level) {
    let camelized = ''
    let wasWord = false
    for (let i = 0; i < s.length; i++) {
      let c = s.charAt(i)
      switch (c) {
        case '?':
        case '!':
        case ',':
        case '&':
        case '-':
        case '\'':
        case '.':
        case ' ':
        case '(':
        case ')':
          wasWord = true
          break
        default:
          if (wasWord) {
            c = c.toUpperCase()
            wasWord = false
          }
          camelized += c
      }
    }
    return camelized
  }
}

export class CommonModule {

  readonly directives: SelectorDirective[] = []
  readonly service: CommonService

  constructor() {
    this.service = new CommonService()
    const codeDirective = new class extends SelectorDirective {
      protected async handle(context: Context, el: HTMLElement) {
        el.innerHTML = prettyPrintOne(el.innerHTML)
      }
    }("code")
    this.directives.push(codeDirective)
  }
}

const common = new CommonModule()
export default common
