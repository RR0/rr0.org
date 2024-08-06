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
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "source-id"
    replacement.ariaLabel = "Source"
    const sourceId = this.counter.next(context)
    replacement.textContent = sourceId
    const sourceContentsEl = outputDoc.createElement("span")
    sourceContentsEl.className = "source-contents"
    await this.content(context, original, sourceContentsEl)
    const anchor = outputDoc.createElement("span")
    anchor.id = sourceId
    anchor.className = "anchor"
    replacement.append(anchor, sourceContentsEl)
    return replacement
  }

  protected async content(context: HtmlRR0SsgContext, original: HTMLElement, container: HTMLElement) {
    const href = (original as HTMLAnchorElement).href
    if (href) {
      const source = await this.factory.create(context, href)
      await this.renderer.renderContent(context, source, container)
    } else {
      container.innerHTML = original.innerHTML
    }
  }
}
