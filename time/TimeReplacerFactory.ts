import {ReplacerFactory} from "../tool/step/content/replace/ReplacerFactory"
import {RegexReplacer} from "../tool/step/content/replace/RegexReplacer"
import {TimeReplacer} from "./TimeReplacer"
import {RR0SsgContext} from "../RR0SsgContext"

export class TimeReplacerFactory implements ReplacerFactory<RegexReplacer> {

  private replacer: TimeReplacer

  constructor(protected timeFiles: string[]) {
    this.replacer = new TimeReplacer(timeFiles)
  }

  async create(context: RR0SsgContext): Promise<RegexReplacer> {
    return {
      replace: (substring: string, ...args: any[]): string => {
        const attrs = args[0]
        const timeStr = args[1]
        return this.replacer.replacement(context, substring, timeStr, attrs)
      }
    }
  }
}
