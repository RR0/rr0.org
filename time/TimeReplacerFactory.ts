import {TimeReplacer} from "./TimeReplacer"
import {RR0SsgContext} from "../RR0SsgContext"
import {RegexReplacer, ReplacerFactory} from "ssg-api"

export class TimeReplacerFactory implements ReplacerFactory<RegexReplacer> {

  protected readonly replacer: TimeReplacer

  constructor(timeFiles: string[]) {
    this.replacer = new TimeReplacer(timeFiles)
  }

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
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
