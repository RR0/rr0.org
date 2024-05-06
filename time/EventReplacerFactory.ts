import { DomReplacer, ReplacerFactory } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DataService } from "../DataService"
import { RR0Data } from "../RR0Data"
import { SourceReplacerFactory } from "../source/SourceReplacerFactory"
import { EventRenderer } from "./EventRenderer"

export class EventReplacer<D extends RR0Data> {

  constructor(protected renderer: EventRenderer<D>, protected dataService: DataService<D>) {
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    const outputDoc = context.outputFile.document
    const replacement = outputDoc.createElement("span")
    const href = (original as HTMLAnchorElement).href || original.dataset.href
    await this.sourceFromFile(context, replacement, href)
    return replacement
  }

  protected async sourceFromFile(context: HtmlRR0SsgContext, container: HTMLElement, href: string) {
    const event = this.dataService.read(context, href)
    if (!event) {
      throw new Error("Could not find metadata in " + href)
    }
    this.renderer.renderContent(context, event, container)
  }
}

/**
 * Creates replacers for sources HTML in a given context.
 */
export class EventReplacerFactory<D extends RR0Data> implements ReplacerFactory<DomReplacer> {

  constructor(protected renderer: EventRenderer<D>, protected sourceReplacerFactory: SourceReplacerFactory) {
  }

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const replacer = new EventReplacer<D>(this.renderer, this.sourceReplacerFactory.dataService)
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return replacer.replacement(context, original)
      }
    }
  }
}
