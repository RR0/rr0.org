import {Injectable} from '@angular/core';
import {CommonsService, org} from './Commons.service';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class NetService {
  private prefix = 'https://crossorigin.me/https://rr0.org/';

  constructor(private commonsService: CommonsService, private $http: Http, private http: HttpClient) {
  }

  getPage(url: string) {
    const fullUrl = this.prefix + url;
    return this.http.get(fullUrl, {responseType: 'document'});
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
  checkedLink(e, toReplace, l, replacement, cacheIt, t) {
    var self = this;
    if (l) {
      l = this.commonsService.addEndingSlash(l);
    }
    if (e.className !== org.constantClass) {
      if (!replacement) {
        replacement = toReplace;
      }
      var newText = org.text(e).replace(toReplace, replacement);  // Replace text early, the link will come later
      if (e.nodeType === Node.TEXT_NODE) {
        e.nodeValue = newText;
      } else {
        e.innerHTML = newText;
      }
      if (t) {
        e.title = t;
      }
      if (l && l !== this.commonsService.getUri()) {
        toReplace = replacement;
        var failProc = function () {
          var pLink = this.commonsService.parentLink(l);
          if (this.commonsService.getUri().indexOf('/time/') < 0) {    // TODO: should ask time module
            $log.debug('failed ' + l + ' trying ' + pLink + ' for e\'sparent=' + e.parentNode);
            cacheIt = false;
            self.checkedLink(e, toReplace, pLink, replacement, cacheIt, t);
          }
        };

        self.onExists(l)
          .then(function (req) {
            if (l !== ('/time/0/0/')) {                             // TODO: should ask time module
              self.onExists(l + '/index.html')
                .then(function (req) {
                  console.debug('found link ' + l + ' for e\'sparent=' + e.parentNode);
                  e = this.linkify(e, replacement, l, replacement, cacheIt);
                  if (t) {
                    e.title = t;
                  }
                }).error(failProc);
            }
          }).error(failProc);
      }
    }
  }


  onExists(l) {
    return this.$http.head(l);
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
    var uri = this.commonsService.getUri();
    if (!org.hasClass(e, org.constantClass) && l !== uri && (l + '/') !== uri) {
      var txt = org.text(e);
      if (txt) {
        var pos = txt.indexOf(k);
        if (pos >= 0) {
          console.debug('linkify(\'' + txt + '\', ' + k + ', \'' + l + '\' for e\'sparent=' + e.parentNode);
          if (!r) {
            r = k;
          }
          var text1;
          if (pos > 0) {
            text1 = document.createTextNode(txt.substring(0, pos));
          }
          var re = document.createTextNode(r);
          var le = org.linkElement(l, re);
          var endPos = pos + k.length;
          var text2;
          if (endPos < txt.length) {
            text2 = document.createTextNode(txt.substring(endPos));
          }
          var pNode = e.parentNode;
          if (pNode) {    // TODO: Should not occur
            pNode.replaceChild(le, e);
            if (text1) {
              pNode.insertBefore(text1, le);
            }
            if (text2) {
              pNode.insertBefore(text2, le.nextSibling);
            }
          }
          if (cacheIt) {
            org.toLink(l, r);
          }
          e = le;
        }
      }
    }
    return e;
  }
}
