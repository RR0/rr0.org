import {ContextVarName, SsgContext} from "./SsgContext"
import {HtmlFileInfo} from "./util/file/HtmlFileInfo"

export type HtmlVarName = ContextVarName | keyof HtmlFileInfo

export interface HtmlSsgContext extends SsgContext {
  inputFile: HtmlFileInfo
  outputFile: HtmlFileInfo

  getVar(varName: HtmlVarName): string | undefined

  setVar(varName: HtmlVarName, value: any): void
}
