import {ReplacerFactory} from "../../ReplacerFactory"
import {SsgReplacer} from "../../SsgReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {promise as glob} from "glob-promise"
import {PeopleReplacer} from "./PeopleReplacer"

export class PeopleReplacerFactory implements ReplacerFactory {

  protected singleton?: PeopleReplacer

  async create(context: SsgContext): Promise<SsgReplacer> {
    const instance = await this.getInstance()
    return {
      replacer:
        /**
         * Replace time tags but urls.
         */
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
