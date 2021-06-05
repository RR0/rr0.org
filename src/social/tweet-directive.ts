import {Context, SelectorDirective} from "../common"

export class TweetDirective extends SelectorDirective {

  constructor() {
    super(".rr0-tweet")
    const fjs = document.getElementsByTagName('script')[0]
    const frag = document.createDocumentFragment()
    const js = document.createElement('script')
    js.src = '//platform.twitter.com/widgets.js'
    frag.appendChild(js)
    fjs.parentNode.insertBefore(frag, fjs)
  }

  protected async handle(context: Context, el: HTMLElement) {
    el.innerHTML = '<a href="https://twitter.com/share" class="twitter-share-button" data-count="horizontal">Tweet</a>'
  }
}
