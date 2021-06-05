import {Context, SelectorDirective} from "../common"

export interface TitleScope {
  title: string;
  author: string;
  copyright: string;

  setTitle(text): void;
}

/**
 * Sets controller's title to be displayed from the title header tag.
 */
export class TitleDirective extends SelectorDirective {

  constructor(private scope: TitleScope) {
    super("title")
  }

  protected async handle(context: Context, el: HTMLElement) {
    this.scope.setTitle(el.innerText)
  }
}
