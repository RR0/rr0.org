import { SourceRenderer } from "./SourceRenderer"
import { DataService } from "../DataService"
import { HttpSource } from "../time/datasource/HttpSource"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { SourceFactory } from "./SourceFactory"

/**
 * Replaces a source tag with the actual source web UI.
 */
export class SourceReplacer {
  /**
   * Source counter in the scope of the current page/context.
   */
  protected number = 0

  protected readonly factory: SourceFactory

  constructor(protected renderer: SourceRenderer, dataService: DataService, http: HttpSource, baseUrl: string) {
    this.factory = new SourceFactory(dataService, http, baseUrl)
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    this.number++
    const sourceStr = this.number.toString()
    const sourceId = `source-${sourceStr}`
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "source-id"
    replacement.ariaLabel = "Source"
    replacement.textContent = "s" + sourceStr
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
      await this.sourceFromLink(context, contents, href)
    } else {
      contents.innerHTML = original.innerHTML
    }
  }

  protected async sourceFromLink(context: HtmlRR0SsgContext, container: HTMLElement, href: string) {
    const source = await this.factory.create(context, href)
    this.renderer.renderContent(context, source, container)
  }
}
