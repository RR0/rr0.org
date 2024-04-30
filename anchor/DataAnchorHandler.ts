import { AnchorHandler } from "./AnchorHandler"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeReplacer } from "../time/TimeReplacer"
import { TimeTextBuilder } from "../time/TimeTextBuilder"
import { DataService } from "../DataService"
import { Rr0Data } from "../Rr0Data"

export class DataAnchorHandler implements AnchorHandler {

  constructor(protected dataService: DataService<Rr0Data>) {
  }

  handle(context: HtmlRR0SsgContext, a: HTMLAnchorElement, pathToSearch: string) {
    if (this.dataService.dirs.find(dir => dir.startsWith(pathToSearch))) {
      const data = this.dataService.read(context, pathToSearch)
      const type = data?.type
      if (["api", "product"].includes(type)) {

      }
    }
  }
}
