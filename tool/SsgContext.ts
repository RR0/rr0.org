import {FileInfo} from "./util/file/FileInfo"

export type ContextVarName = "mail" | keyof FileInfo

export interface SsgContext {

  readonly locales: string | string[]

  inputFile: FileInfo

  outputFile: FileInfo

  getVar(varName: ContextVarName): string | undefined

  setVar(varName: ContextVarName, value: any): void

  log: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }

  debug: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }

  warn: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }

  error: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }

  clone(): SsgContext
}

