import {ReplacerFactory} from "../replace/ReplacerFactory"
import {SsgReplacer} from "../replace/SsgReplacer"
import {SsgContext} from "../SsgContext"
import {TimeReplacer} from "./TimeReplacer"
import {promise as glob} from "glob-promise"

export class TimeReplacerFactory implements ReplacerFactory {

  protected singleton?: TimeReplacer

  async create(context: SsgContext): Promise<SsgReplacer> {
    const instance = await this.getInstance()
    return {
      replacer:
        /**
         * Replace time tags but urls.
         */
        (substring: string, ...args: any[]): string => {
          const timeStr = args[0]
          return instance.replacement(context, substring, timeStr)
        }
    }
  }

  protected async getInstance(): Promise<TimeReplacer> {
    if (!this.singleton) {
      const minusYearFiles = await glob("time/-?/?/?/?")
      const year1Files = await glob("time/?")
      const year2Files = await glob("time/?/?")
      const year3Files = await glob("time/?/?/?")
      const year4Files = await glob("time/?/?/?/?")
      const monthFiles = await glob("time/?/?/?/?/??")
      const dayFiles = await glob("time/?/?/?/?/??/??")
      const timeFiles = year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(minusYearFiles).concat(monthFiles).concat(dayFiles)
      this.singleton = new TimeReplacer(timeFiles)
    }
    return this.singleton
  }
}
