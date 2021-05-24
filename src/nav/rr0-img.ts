import {Context, SelectorDirective} from "../common"

/**
 * Picks last image from contents to set header background
 */
export class ImageDirective extends SelectorDirective<HTMLImageElement> {
  constructor() {
    super("img")
  }

  protected async handle(context: Context, el: HTMLImageElement): Promise<void> {
    const pageHeading = document.querySelector('header')
    if (pageHeading) {
      let style = window.getComputedStyle(pageHeading).backgroundImage
      style += `, url('${el.src}')`
      pageHeading.style.backgroundImage = style
    }
  }
}
