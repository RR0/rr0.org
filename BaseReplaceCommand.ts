import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { HtmlRR0SsgContext } from "./RR0SsgContext"

import path from "path"

/**
 * Enforce a constant host value for the <base> tag
 */
export class BaseReplaceCommand extends DomReplaceCommand {

  constructor(protected baseUrl: string) {
    super("base")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const self = this
    return new class implements DomReplacer<HTMLBaseElement> {
      async replace(original: HTMLBaseElement): Promise<HTMLBaseElement> {
        const dir = path.dirname(context.file.name)
        original.href = path.join(self.baseUrl, dir, "/")
        return original
      }
    }
  }
}
