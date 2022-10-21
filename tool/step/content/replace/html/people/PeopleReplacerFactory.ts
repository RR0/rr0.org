import {ReplacerFactory} from "../../ReplacerFactory"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {promise as glob} from "glob-promise"
import {PeopleReplacer} from "./PeopleReplacer"

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
      this.singleton = new PeopleReplacer(peopleFiles)
    }
    return this.singleton
  }
}
