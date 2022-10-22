import {TimeContext} from "./step/content/replace/html/time/TimeContext"
import {SsgMessages} from "./i18n/SsgMessages"
import {ssgMessages} from "./i18n"
import {FileInfo} from "./util/file/FileInfo"

export interface SsgContext {
  messages: SsgMessages
  log: () => void
  debug: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }
  inputFile: FileInfo
  outputFile: FileInfo
  readonly locales: string | string[]
  readonly time: TimeContext

  clone(): SsgContext
}

export class SsgContextImpl implements SsgContext {

  readonly messages: SsgMessages
  readonly log = process.env.LOG_LEVEL === "none" ? () => {
  } : console.log
  readonly debug = process.env.LOG_LEVEL === "debug" ? console.debug : () => {
  }

  constructor(readonly locales: string | string[], readonly time: TimeContext,
              currentFile: FileInfo | undefined = undefined) {
    this.messages = ssgMessages[Array.isArray(locales) ? locales[0] : locales]
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

  clone(): SsgContext {
    return new SsgContextImpl(this.locales, this.time.clone(), this._inputFile)
  }
}
