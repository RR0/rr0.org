import {ContextVarName, SsgContext} from "./SsgContext"
import {HtmlFileInfo, HtmlLinks, HtmlMeta} from "./util/file/HtmlFileInfo"

export type HtmlContextVarName = ContextVarName | keyof HtmlMeta | keyof HtmlLinks

export type HtmlVarName = HtmlContextVarName | keyof HtmlFileInfo

export interface HtmlSsgContext extends SsgContext {
  inputFile: HtmlFileInfo
  outputFile: HtmlFileInfo

  getVar(varName: HtmlVarName): string | undefined

  setVar(varName: HtmlVarName, value: any): void
}
