import { DomReplacement } from "../DomReplacement"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { ChronologySource } from "./ChronologySource"

export class ChronologyReplacer implements DomReplacement<HtmlRR0SsgContext> {
  protected readonly done: Set<string>

  constructor(protected datasources: ChronologySource[]) {
    this.done = new Set<string>()
  }

  async replacement(context: HtmlRR0SsgContext, element: HTMLElement): Promise<HTMLElement> {
    for (const datasource of this.datasources) {
      const datasourceKey = context.inputFile.name + "$" + datasource.copyright
      if (!this.done.has(datasourceKey)) {
        let items = await datasource.get(context)
        for (const item of items) {
          element.append(item)
        }
        this.done.add(datasourceKey)
      }
    }
    return element
  }
}
