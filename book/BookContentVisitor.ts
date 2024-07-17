import { ContentVisitor } from "../RR0ContentStep"
import { HtmlLinks, HtmlMeta } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

export class BookContentVisitor implements ContentVisitor {

  constructor(protected bookMeta: Map<string, HtmlMeta>, protected bookLinks: Map<string, HtmlLinks>) {
  }

  visit(context: HtmlRR0SsgContext): void {
    const bookMeta = this.bookMeta.get(context.file.name)
    Object.assign(context.file.meta, bookMeta)
    const bookLinks = this.bookLinks.get(context.file.name)
    Object.assign(context.file.links, bookLinks)
  }
}
