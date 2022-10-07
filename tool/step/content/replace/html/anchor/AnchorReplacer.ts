import {SsgContext} from "../../../../../SsgContext"

export class AnchorReplacer {
  protected static readonly blankTarget = ` target="_blank"`

  replacement(context: SsgContext, substring: string, dir: string, file: string | undefined, contents: string): string {
    let replacement: string | undefined
    if (dir) {
      let target: string
      if (dir.startsWith("http") && substring.indexOf(AnchorReplacer.blankTarget) < 0) {
        target = AnchorReplacer.blankTarget
      } else {
        if (!file && !dir.endsWith("/")) {
          dir += "/"
        }
        target = ""
      }
      replacement = `<a href="${dir}"${target}>${contents}</a>`
    }
    if (!replacement) {
      replacement = substring
    } else {
      context.debug("\tReplacing anchor", substring, "with", replacement)
    }
    return replacement
  }
}
