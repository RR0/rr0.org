import {NetModule, NetService} from './net'
import {CommonModule, CommonService} from "./common"

export class LangService {

  constructor(private commonsService: CommonService, private netService: NetService, private docLang: string, private userLang: string) {
    /**
     * Get the URI of the original document, if any.
     * By convention, a suffixed document is a translation, and the original is without this suffix.
     * Thus, an original is always without suffix, typically index.html.
     * So an original english will be index.html (with html lang="en") and its translation index_fr.html,
     * and an original french will be index.html (with html lang="fr") and there will be no translation (or its translation will be index_en.html),
     * If the suffix is not explicit, we need to check.
     *
     * uri:https://rr0.org/data/a/a/a/a/m/Something/index_fr.html --> original is https://rr0.org/data/a/a/a/a/m/Something/index.html
     * uri:https://rr0.org/data/a/a/a/a/m/Something/index.fr --> original is the same
     * uri:https://rr0.org/data/a/a/a/a/m/Something/ --> if https://rr0.org/data/a/a/a/a/m/Something/index_fr.html exists, original is https://rr0.org/data/a/a/a/a/m/Something/index.html
     *
     * @param uri
     */
  }

  setLang(l?: string) {
    if (!l) {
      l = document.documentElement.lang
    }
    this.docLang = l
    document.documentElement.lang = this.docLang
  }

  async checkAlternate(uri, origStatus, transStatus) {
    const dotPos = uri.lastIndexOf(".")
    const pageSpecified = dotPos > 0
    let translation
    if (pageSpecified) {    // index.html or index_fr.html
      const sPos = uri.lastIndexOf('_')
      if (sPos === dotPos - 3) {
        const orig1 = uri.substring(0, sPos) + uri.substring(sPos + 3)
        await this.notifyOrig(orig1, origStatus)
        return
      } else {
        translation = `${uri.substr(0, dotPos)}_${this.userLang}${uri.substr(dotPos)}`
      }
    } else {
      if (this.docLang !== this.userLang) {
        translation = this.commonsService.addEndingSlash(uri) + "index_" + this.userLang + ".html"
      }
    }
    if (translation) {
      if (this.docLang !== this.userLang) {
        await this.notifyTrans(translation, transStatus)
      } else {
        const orig2 = this.commonsService.addEndingSlash(uri.substring(0, uri.lastIndexOf('/'))) + "index.html"
        await this.notifyTrans(translation, async (trans) => {  // If there is a translation it's myself (default
          // priority is to
          // my language)
          if (trans) {    // If there is an translation (myself), check for original
            await this.notifyOrig(orig2, origStatus)
          }
        })
      }
    }
  }

  private async notifyOrig(original, origFound) {
    if (await this.netService.onExists(original)) {
      origFound(original)
    } else {
      origFound(null)
    }
  }

  private async notifyTrans(translation: string, transFound) {
    if (await this.netService.onExists(translation)) {
      transFound(translation)
    } else {
      transFound(null)
    }
  }
}

export class LangModule {
  docLang = null
  userLang = "fr"
  readonly service: LangService

  constructor(common: CommonModule, net: NetModule) {
    this.service = new LangService(common.service, net.service, this.docLang, this.userLang)
    this.service.setLang()
  }
}
