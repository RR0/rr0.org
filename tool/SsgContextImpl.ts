import {FileInfo} from "./util/file/FileInfo"
import {ContextVarName, SsgContext} from "./SsgContext"

export class SsgContextImpl implements SsgContext {

  readonly log = process.env.LOG_LEVEL === "none" ? () => {
  } : console.log

  readonly debug = process.env.LOG_LEVEL === "debug" ? console.debug : () => {
  }

  readonly warn = process.env.LOG_LEVEL === "warn" ? console.warn : () => {
  }

  readonly error = process.env.LOG_LEVEL === "error" ? console.error : () => {
  }

  protected vars = new Map<string, string>()

  constructor(readonly locales: string | string[], currentFile: FileInfo | undefined = undefined) {
    this._inputFile = currentFile
  }

  protected _inputFile: FileInfo | undefined

  get inputFile(): FileInfo {
    if (!this._inputFile) {
      throw Error("Should have a inputFile")
    }
    return this._inputFile
  }

  set inputFile(value: FileInfo) {
    this._inputFile = value
  }

  protected _outputFile: FileInfo | undefined

  get outputFile(): FileInfo {
    if (!this._outputFile) {
      throw Error("Should have a outputFile")
    }
    return this._outputFile
  }

  set outputFile(value: FileInfo) {
    this._outputFile = value
  }

  getVar(varName: ContextVarName): string | undefined {
    if (this.inputFile.hasOwnProperty(varName)) {
      const value = this.inputFile[varName as keyof FileInfo]
      return value?.toString()
    } else {
      return this.vars.get(varName)
    }
  }

  setVar(varName: ContextVarName, value: any): void {
    if (FileInfo.prototype.hasOwnProperty.call(FileInfo.prototype, varName)) {
      (this.inputFile as any)[varName] = value
    } else {
      this.vars.set(varName, value)
    }
  }

  clone(): SsgContext {
    return new SsgContextImpl(this.locales, this._inputFile)
  }
}
