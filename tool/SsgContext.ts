import {TimeContext} from "./step/content/replace/html/time/TimeContext"
import {SsgMessages} from "./i18n/SsgMessages"
import {ssgMessages} from "./i18n"
import {FileInfo} from "./util/file/FileInfo"

export interface SsgContext {
  messages: SsgMessages
  log: () => void
  debug: { (message?: any, ...optionalParams: any[]): void; (...data: any[]): void }
  currentFile: FileInfo
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
    this._currentFile = currentFile
  }

  protected _currentFile: FileInfo | undefined

  get currentFile(): FileInfo {
    if (!this._currentFile) {
      throw Error("Should have a currentFile")
    }
    return this._currentFile
  }

  set currentFile(value: FileInfo) {
    this._currentFile = value
  }

  clone(): SsgContext {
    return new SsgContextImpl(this.locales, this.time.clone(), this._currentFile)
  }
}
