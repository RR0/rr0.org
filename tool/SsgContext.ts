import {TimeContext} from "./step/content/replace/html/time/TimeContext"
import {SsgMessages} from "./i18n/SsgMessages"
import {FileInfo} from "./util/file/FileInfo"

export type ContextVarName = "mail" | keyof FileInfo

export interface SsgContext {
  messages: SsgMessages
  log: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }
  debug: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }
  warn: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }
  error: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }
  inputFile: FileInfo
  outputFile: FileInfo
  readonly locales: string | string[]
  readonly time: TimeContext

  clone(): SsgContext

  getVar(varName: ContextVarName): string | undefined

  setVar(varName: ContextVarName, value: any): void
}

