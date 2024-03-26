import { PeopleReplacer } from "./PeopleReplacer"
import { DomReplacer, ReplacerFactory } from "ssg-api"
import { PeopleService } from "./PeopleService"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

/**
 * Creates replacers for people HTML in a given context.
 */
export class PeopleReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected singleton?: PeopleReplacer

  constructor(protected service: PeopleService) {
  }

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const instance = await this.getInstance()
    return {
      replace:
        (original: HTMLElement): Promise<HTMLElement> => {
          return instance.replacement(context, original)
        }
    }
  }

  protected async getInstance(): Promise<PeopleReplacer> {
    if (!this.singleton) {
      this.singleton = new PeopleReplacer(this.service)
    }
    return this.singleton
  }
}
