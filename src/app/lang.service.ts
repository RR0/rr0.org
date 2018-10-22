import { Injectable } from '@angular/core';
import { org, CommonsService } from './Commons.service';
import { NetService } from './Net.service';

@Injectable()
export class LangService {
  docLang = null;
  userLang = 'fr';

  constructor(private commonsService: CommonsService, private netService: NetService) {
  }

  private notifyOrig(original, origFound) {
    this.netService.onExists(original).subscribe({
      next: req => {
        origFound(original);
      }, error: failReq => {
        origFound(null);
      }
    });
  }

  private notifyTrans(translation, transFound) {
    this.netService.onExists(translation).subscribe({
      next: req => {
        transFound(translation);
      }, error: failReq => {
        transFound(null);
      }
    });
  }

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

  setLang(l?) {
    if (!l) {
      l = document.documentElement.lang;
    }
    this.docLang = l;
  }

  checkAlternate(uri, origStatus, transStatus) {
    var dotPos = uri.lastIndexOf(".");
    var pageSpecified = dotPos > 0;
    var translation;
    if (pageSpecified) {    // index.html or index_fr.html
      var sPos = uri.lastIndexOf('_');
      if (sPos === dotPos - 3) {
        var orig1 = uri.substring(0, sPos) + uri.substring(sPos + 3);
        this.notifyOrig(orig1, origStatus);
        return;
      } else {
        translation = uri.substr(0, dotPos) + "_" + this.userLang + uri.substr(dotPos);
      }
    } else {
      if (this.docLang !== this.userLang) {
        translation = this.commonsService.addEndingSlash(uri) + "index_" + this.userLang + ".html";
      }
    }
    if (translation) {
      if (this.docLang !== this.userLang) {
        this.notifyTrans(translation, transStatus);
      } else {
        var orig2 = this.commonsService.addEndingSlash(uri.substring(0, uri.lastIndexOf('/'))) + "index.html";
        this.notifyTrans(translation, function (trans) {  // If there is a translation it's myself (default priority is to my language)
          if (trans) {    // If there is an translation (myself), check for original
            this.notifyOrig(orig2, origStatus);
          }
        });
      }
    }
  }
}