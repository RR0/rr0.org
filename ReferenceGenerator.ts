import { HtmlSsgContext } from "ssg-api/dist/src/HtmlSsgContext"

export interface ReferenceGenerator<C extends HtmlSsgContext> {

  readonly value: string

  next(context: C): string
}
