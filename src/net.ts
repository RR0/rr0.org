import common, {CommonModule, CommonService} from './common'

export class NetService {

  constructor(private commonsService: CommonService, private constantClass: string) {
  }

  async onExists(l: string): Promise<boolean> {
    const url = `https://rr0.org${l}`
    let exists
    try {
      const res = await fetch(url, {
        method: 'HEAD'
      })
      exists = res.ok && res.status == 200
      console.log(`${url} does ${!exists ? "not " : ""}exists`)
    } catch (e) {
      console.error(`Could not check existence of ${url}`, e)
      exists = false
    }
    return exists
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
    if (l) {
      l = this.commonsService.addEndingSlash(l)
    }
    if (e.className !== this.constantClass) {
      if (!replacement) {
        replacement = toReplace
      }
      const newText = common.service.text(e).replace(toReplace, replacement)  // Replace text early, the link will
      // come later
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
        const failProc = async () => {
          const pLink = this.commonsService.parentLink(l)
          const currentURI = this.commonsService.getUri()
          if (currentURI.indexOf("/time/") < 0 && l !== pLink) {    // TODO: should ask time module
            common.service.log(`failed ${l} trying ${pLink} for e'sparent=${e.parentNode}`)
            cacheIt = false
            await this.checkedLink(e, toReplace, pLink, replacement, cacheIt, t)
            console.log(`checked ${l}`)
          }
        }

        if (await this.onExists(l)) {
          if (l !== "/time/0/0/") {                             // TODO: should ask time module
            if (await this.onExists(`${l}/index.html`)) {
              common.service.log(`found link ${l} for e'sparent=${e.parentNode}`)
              e = this.linkify(e, replacement, l, replacement, cacheIt)
              if (t) {
                e.title = t
              }
            } else {
              return failProc()
            }
          }
        } else {
          return failProc()
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
  private linkify(e: HTMLElement, k: string, l: string, r: string, cacheIt: boolean) {
    const uri = this.commonsService.getUri()
    if (!common.service.hasClass(e, this.constantClass) && l !== uri && (l + "/") !== uri) {
      const txt = common.service.text(e)
      if (txt) {
        const pos = txt.indexOf(k)
        if (pos >= 0) {
          common.service.log(`linkify('${txt}', ${k}, '${l}' for e'sparent=${e.parentNode}`)
          if (!r) {
            r = k
          }
          let text1: Node
          if (pos > 0) {
            text1 = document.createTextNode(txt.substring(0, pos))
          }
          const re = document.createTextNode(r)
          const le = common.service.linkElement(l, re)
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
            common.service.toLink(l, r)
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
    this.service = new NetService(common.service, common.service.constantClass)
  }
}

const net = new NetModule(common)
export default net
