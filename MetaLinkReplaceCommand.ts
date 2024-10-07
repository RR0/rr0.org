import { HtmlSsgContext, Link, ReplaceCommand } from "ssg-api"
import { HtmlRR0SsgContext } from "./RR0SsgContext.js"

export interface LinkHandler<C extends HtmlSsgContext> {

  start(context: C): Link | undefined

  contents(context: C): Link | undefined

  prev(context: C): Link | undefined

  next(context: C): Link | undefined
}

/**
 * Convert meta <link> to HTML <nav> links.
 */
export class MetaLinkReplaceCommand<C extends HtmlRR0SsgContext = HtmlRR0SsgContext> implements ReplaceCommand<C> {

  constructor(protected defaultHandler?: LinkHandler<C>) {
  }

  async execute(context: C): Promise<void> {
    const file = context.file
    const dom = file.dom
    const doc = file.document
    const ul = doc.querySelector("nav ul")
    if (!ul) {
      context.error("Could not find nav list in " + context.file.name)
      return
    }
    const relStart = file.links.start || this.defaultHandler?.start(context)
    if (relStart) {
      ul.appendChild(this.linkItem(context, relStart));
    }
    const relContents = file.links.contents || this.defaultHandler?.contents(context)
    if (relContents) {
      ul.appendChild(this.linkItem(context, relContents));
    }
    const relPrev = file.links.prev || this.defaultHandler?.prev(context)
    if (relPrev) {
      ul.appendChild(this.linkItem(context, relPrev));
    }
    const relNext = file.links.next || this.defaultHandler?.next(context)
    if (relNext) {
      ul.appendChild(this.linkItem(context, relNext));
    }
    file.dom = dom
  }

  async contentStepEnd() {
    // NOP
  }

  protected linkItem(context: HtmlRR0SsgContext, link: Link): HTMLLIElement {
    const doc = context.file.document
    const a = doc.createElement("a")
    a.className = link.type
    a.textContent = link.text
    a.href = link.url
    const li = doc.createElement("li")
    li.appendChild(a)
    li.title = context.messages.nav[link.type]
    return li;
  }
}
