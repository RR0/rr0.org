import {ReplacerFactory} from "../../ReplacerFactory"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {TimeReplacer} from "./TimeReplacer"

export class TimeReplacerFactory implements ReplacerFactory<RegexReplacer> {
  private replacer: TimeReplacer

  constructor(protected timeFiles: string[]) {
    this.replacer = new TimeReplacer(timeFiles)
  }

  async create(context: SsgContext): Promise<RegexReplacer> {
    return {
      replace: (substring: string, ...args: any[]): string => {
        const attrs = args[0]
        const timeStr = args[1]
        return this.replacer.replacement(context, substring, timeStr, attrs)
      }
    }
  }
}
