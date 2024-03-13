import { HtmlSsgContext } from "ssg-api"

export interface DomReplacement<C extends HtmlSsgContext = HtmlSsgContext, E extends HTMLElement = HTMLElement> {
  replacement(context: C, element: E): Promise<Node>
}
