import {SsgContext} from "./SsgContext"
import {HtmlFileInfo} from "./util/file/HtmlFileInfo"

export interface HtmlSsgContext extends SsgContext {
  inputFile: HtmlFileInfo
  outputFile: HtmlFileInfo
}
