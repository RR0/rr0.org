import {RegexReplacer} from "../RegexReplacer"
import {RegexReplaceCommand} from "../RegexReplaceCommand"
import {HtmlSsgContext} from "../../../../HtmlSsgContext"

export class AngularExpressionReplaceCommand extends RegexReplaceCommand<HtmlSsgContext> {

  constructor() {
    super(new RegExp(`{{\\s*(.*?)(?:\\s*\\|\\s*(.*?))\\s*}}`, "gm"))
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<RegexReplacer> {
    return {
      replace(substring: string, ...args: any[]): string {
        const value = args[0]
        let replacement = value
        const filter = args[1]
        switch (filter) {
          case "number":
            replacement = new Intl.NumberFormat(context.locales).format(value)
            break
          default:
            context.warn("Unsupported Angular filter", filter)
        }
        return replacement
      }
    }
  }
}
