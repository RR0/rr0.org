import { DomReplacer, ReplacerFactory } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { AllDataService } from "../data/AllDataService"
import { RR0Data } from "../data/RR0Data"
import { EventRenderer } from "./EventRenderer"

export class EventReplacer<D extends RR0Data> {

  constructor(protected renderer: EventRenderer<D>, protected dataService: AllDataService) {
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    const href = (original as HTMLAnchorElement).href || original.dataset.href
    await this.sourceFromFile(context, replacement, href)
    return replacement
  }

  protected async sourceFromFile(context: HtmlRR0SsgContext, container: HTMLElement, href: string) {
    const data = await this.dataService.getFromDir<D>(href, ["sighting"], ["index.json"])
    if (data.length <= 0) {
      throw new Error("Could not find metadata in " + href)
    }
    await this.renderer.render(context, data[0], container)
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
