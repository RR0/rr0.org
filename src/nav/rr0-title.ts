import common, {SelectorDirective} from "../common"

export interface TitleScope {
  title: string;
  author: string;
  copyright: string;

  setTitle(text): void;
}

/**
 * Sets controller's title to be displayed from the title header tag.
 */
class TitleDirective extends SelectorDirective {

  constructor(private scope: TitleScope) {
    super("[title]")
  }

  protected handle(elem: HTMLElement) {
    if (elem.innerText.indexOf('{{') < 0) {
      this.scope.setTitle(elem.innerText)
    }
  }
}

export const titleScope: TitleScope = {
  author: "", copyright: "", title: "", setTitle(text): void {
  }
}
common.directives.push(new TitleDirective(titleScope))
