import {LinkHandler} from "./LinkReplaceCommand"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {Link} from "../../../../../util/file/HtmlFileInfo"

export class TimeLinkDefaultHandler implements LinkHandler {

  contents(context: HtmlSsgContext): Link | undefined {
    return undefined
  }

  next(context: HtmlSsgContext): Link | undefined {
    return undefined
  }

  prev(context: HtmlSsgContext): Link | undefined {
    return undefined
  }

  start(context: HtmlSsgContext): Link | undefined {
    return undefined
  }
}
