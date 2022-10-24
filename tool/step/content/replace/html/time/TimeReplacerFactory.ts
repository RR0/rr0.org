import {ReplacerFactory} from "../../ReplacerFactory"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {TimeReplacer} from "./TimeReplacer"
import {promise as glob} from "glob-promise"

export class TimeReplacerFactory implements ReplacerFactory<RegexReplacer> {

  protected singleton?: TimeReplacer

  async create(context: SsgContext): Promise<RegexReplacer> {
    const instance = await this.getInstance()
    return {
      replace: (substring: string, ...args: any[]): string => {
        const attrs = args[0]
        const timeStr = args[1]
        return instance.replacement(context, substring, timeStr, attrs)
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
      const timeFiles = year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
        minusYearFiles).concat(monthFiles).concat(dayFiles).sort()
      this.singleton = new TimeReplacer(timeFiles)
    }
    return this.singleton
  }
}
