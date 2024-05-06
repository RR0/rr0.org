import { DomReplacer, ReplacerFactory } from "ssg-api"
import { SourceRenderer } from "../time/SourceRenderer"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DataService } from "../DataService"
import { RR0Data } from "../RR0Data"
import { Source } from "./Source"

export class SourceReplacer {
  /**
   * Source counter in the scope of the current page/context.
   */
  protected number = 0

  constructor(protected renderer: SourceRenderer, protected dataService: DataService<RR0Data>) {
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    this.number++
    const sourceStr = this.number.toString()
    const sourceId = `source-${sourceStr}`
    const outputDoc = context.outputFile.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "source-id"
    replacement.ariaLabel = "Source"
    replacement.textContent = "s" + sourceStr
    const contents = outputDoc.createElement("span")
    contents.className = "source-contents"
    const href = (original as HTMLAnchorElement).href || original.dataset.href
    if (href) {
      await this.sourceFromFile(context, contents, href)
    } else {
      contents.innerHTML = original.innerHTML
    }
    const anchor = outputDoc.createElement("span")
    anchor.id = sourceId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    return replacement
  }

  protected async sourceFromFile(context: HtmlRR0SsgContext, container: HTMLElement, href: string) {
    const source = this.dataService.read(context, href) as Source
    this.renderer.renderContent(context, source, container)
  }
}

/**
 * Creates replacers for sources HTML in a given context.
 */
export class SourceReplacerFactory implements ReplacerFactory<DomReplacer> {

  constructor(protected renderer: SourceRenderer, readonly dataService: DataService<RR0Data>) {
  }

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const replacer = new SourceReplacer(this.renderer, this.dataService)
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return replacer.replacement(context, original)
      }
    }
  }
}
