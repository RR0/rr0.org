import common, {CommonModule, CommonService, org} from './common'

export class NetService {
  constructor(private commonsService: CommonService, private constantClass: string) {
  }

  async onExists(l): Promise<boolean> {
    const res = await fetch(l, {
      method: 'HEAD'
    })
    return res.status == 200
  }

  /**
   *
   * @param e The element to replace into
   * @param toReplace The text to link in the element contents
   * @param l The link address
   * @param replacement The replacement text, if different from toReplace
   * @param {boolean} cacheIt If the association text->link should be cached (if no fallback)
   * @param {string} [t] title on the link
   */
  async checkedLink(e: HTMLElement, toReplace, l, replacement, cacheIt, t) {
    const self = this
    if (l) {
      l = this.commonsService.addEndingSlash(l)
    }
    if (e.className !== this.constantClass) {
      if (!replacement) {
        replacement = toReplace
      }
      const newText = org.text(e).replace(toReplace, replacement)  // Replace text early, the link will come later
      if (e.nodeType === Node.TEXT_NODE) {
        e.nodeValue = newText
      } else {
        e.innerHTML = newText
      }
      if (t) {
        e.title = t
      }
      if (l && l !== this.commonsService.getUri()) {
        toReplace = replacement
        const failProc = function () {
          const pLink = self.commonsService.parentLink(l)
          if (self.commonsService.getUri().indexOf("/time/") < 0) {    // TODO: should ask time module
            org.log("failed " + l + " trying " + pLink + " for e'sparent=" + e.parentNode)
            cacheIt = false
            self.checkedLink(e, toReplace, pLink, replacement, cacheIt, t).then(() => console.log("link checked"))
          }
        }

        if (await self.onExists(l)) {
          if (l !== ("/time/0/0/")) {                             // TODO: should ask time module
            if (self.onExists(`${l}/index.html`)) {
              org.log("found link " + l + " for e'sparent=" + e.parentNode)
              e = self.linkify(e, replacement, l, replacement, cacheIt)
              if (t) {
                e.title = t
              }
            } else {
              failProc()
            }
          }
        } else {
          failProc()
        }
      }
    }
  }

  /**
   * Transform some text into a link.
   *
   * @param {HTMLElement} e The element containing the text.
   * @param {string} k The text to look for.
   * @param {string} l The URI of the link to create
   * @param {string} [r] The text replacement, if any (matched text remains otherwise)
   * @param {boolean} [cacheIt]
   * @return {HTMLElement}
   */
  private linkify(e, k, l, r, cacheIt) {
    const uri = this.commonsService.getUri()
    if (!org.hasClass(e, this.constantClass) && l !== uri && (l + "/") !== uri) {
      const txt = org.text(e)
      if (txt) {
        const pos = txt.indexOf(k)
        if (pos >= 0) {
          org.log("linkify('" + txt + "', " + k + ", '" + l + "' for e'sparent=" + e.parentNode)
          if (!r) {
            r = k
          }
          let text1
          if (pos > 0) {
            text1 = document.createTextNode(txt.substring(0, pos))
          }
          const re = document.createTextNode(r)
          const le = org.linkElement(l, re)
          const endPos = pos + k.length
          let text2
          if (endPos < txt.length) {
            text2 = document.createTextNode(txt.substring(endPos))
          }
          const pNode = e.parentNode
          if (pNode) {    // TODO: Should not occur
            pNode.replaceChild(le, e)
            if (text1) {
              pNode.insertBefore(text1, le)
            }
            if (text2) {
              pNode.insertBefore(text2, le.nextSibling)
            }
          }
          if (cacheIt) {
            org.toLink(l, r)
          }
          e = le
        }
      }
    }
    return e
  }
}

export class NetModule {
  readonly service: NetService

  constructor(common: CommonModule) {
    this.service = new NetService(common.service, common.constantClass)
  }
}

const net = new NetModule(common)
export default net
