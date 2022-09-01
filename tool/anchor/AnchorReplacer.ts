import {SsgContext} from "../SsgContext"

export class AnchorReplacer {

  static readonly anchorRegExp = new RegExp(`<a href="(.+)">(.+)</a>`)

  constructor() {
  }

  replacement(context: SsgContext, substring: string, contentStr: string): string {
    let replacement: string | undefined
    const parts = AnchorReplacer.anchorRegExp.exec(substring)
    if (parts && parts.length > 2) {
      let url = parts[1]
      if (!url.endsWith(".html") && !url.endsWith("/")) {
        url += "/"
      }
      replacement = `<a href="${url}">${contentStr}</a>`
    }
    if (!replacement) {
      replacement = substring
    }
    context.debug("\tReplacing", substring, "with", replacement)
    return replacement
  }
}
