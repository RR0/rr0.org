import {promise as glob} from "glob-promise"
import {PeopleReplacer} from "./PeopleReplacer"
import {RegexReplacer, ReplacerFactory, SsgContext} from "ssg-api"
import {PeopleFactory} from "./PeopleFactory"

/**
 * Creates replacers for people HTML in a given context.
 */
export class PeopleReplacerFactory implements ReplacerFactory<RegexReplacer> {

  protected singleton?: PeopleReplacer

  async create(context: SsgContext): Promise<RegexReplacer> {
    const instance = await this.getInstance()
    return {
      replace:
        (substring: string, ...args: any[]): string => {
          const peopleStr = args[0]
          return instance.replacement(context, substring, peopleStr)
        }
    }
  }

  protected async getInstance(): Promise<PeopleReplacer> {
    if (!this.singleton) {
      const peopleFiles = await glob("people/*/*")
      const factory = new PeopleFactory(peopleFiles)
      this.singleton = new PeopleReplacer(factory)
    }
    return this.singleton
  }
}
