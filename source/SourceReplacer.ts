import { SourceRenderer } from "./SourceRenderer"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { SourceFactory } from "./SourceFactory"
import { ReferenceGenerator } from "../ReferenceGenerator"

/**
 * Replaces a source tag with the actual source web UI.
 *
 * To give sources a number, the source replacer holds the current source count.
 */
export class SourceReplacer {

  constructor(protected renderer: SourceRenderer, protected readonly factory: SourceFactory,
              protected counter: ReferenceGenerator<any>) {
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    const sourceId = this.counter.next(context)
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "source-id"
    replacement.ariaLabel = "Source"
    replacement.textContent = sourceId
    const contents = outputDoc.createElement("span")
    contents.className = "source-contents"
    await this.content(context, original, contents)
    const anchor = outputDoc.createElement("span")
    anchor.id = sourceId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    return replacement
  }

  protected async content(context: HtmlRR0SsgContext, original: HTMLElement, contents: HTMLSpanElement) {
    const href = (original as HTMLAnchorElement).href || original.dataset.href
    if (href) {
      await this.renderFromLink(context, contents, href)
    } else {
      contents.innerHTML = original.innerHTML
    }
  }

  protected async renderFromLink(context: HtmlRR0SsgContext, container: HTMLElement, href: string) {
    const source = await this.factory.create(context, href)
    this.renderer.renderContent(context, source, container)
  }
}
