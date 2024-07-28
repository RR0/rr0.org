import { DomReplacer, ReplacerFactory } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DataService } from "../DataService"
import { RR0Data } from "../RR0Data"
import { EventRenderer } from "./EventRenderer"

export class EventReplacer<D extends RR0Data> {

  constructor(protected renderer: EventRenderer<D>, protected dataService: DataService) {
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    const href = (original as HTMLAnchorElement).href || original.dataset.href
    await this.sourceFromFile(context, replacement, href)
    return replacement
  }

  protected async sourceFromFile(context: HtmlRR0SsgContext, container: HTMLElement, href: string) {
    const events = await this.dataService.get<D>(href, ["sighting"], ["index.json"])
    if (events.length <= 0) {
      throw new Error("Could not find metadata in " + href)
    }
    this.renderer.renderContent(context, events[0], container)
  }
}

/**
 * Creates replacers for sources HTML in a given context.
 */
export class EventReplacerFactory<D extends RR0Data> implements ReplacerFactory<DomReplacer> {

  constructor(protected replacer: EventReplacer<D>) {
  }

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const replacer = this.replacer
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return replacer.replacement(context, original)
      }
    }
  }
}
