import common, {Context, SelectorDirective} from "../../common"

interface FbScope {
  urlToLike: string;
}

export class FacebookDirective extends SelectorDirective {

  constructor() {
    super(".rr0-fb-like")
    const fjs = document.getElementsByTagName('script')[0]
    const frag = document.createDocumentFragment()
    const id = 'facebook-jssdk'
    if (!document.getElementById(id)) {
      const js = document.createElement('script')
      js.src = '//connect.facebook.net/fr_FR/sdk.js#xfbml=1&appId=104233660507&version=v2.0'
      js.id = id
      frag.appendChild(js)
    }
    fjs.parentNode.insertBefore(frag, fjs)
  }

  protected async handle(context: Context, el: HTMLElement) {
    el.innerHTML = `<span id="fb-root"></span><div class="fb-like" style="line-height: 0.7em" data-href="${window.location.href}" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>`
  }
}

const rr0Tweet = new FacebookDirective()
common.directives.push(rr0Tweet)
