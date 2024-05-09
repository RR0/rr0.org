import { HtmlRR0SsgContext } from "../RR0SsgContext"

export interface AnchorHandler {
  handle(context: HtmlRR0SsgContext, a: HTMLAnchorElement, pathToSearch: string): Promise<void>
}
