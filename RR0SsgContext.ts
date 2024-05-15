import { TimeContext } from "./time/TimeContext"
import { ssgMessages } from "./lang"
import { RR0Messages } from "./lang/RR0Messages"
import { ConsoleLogger, HtmlSsgContext, SsgContext, SsgContextImpl, SsgFile } from "ssg-api"
import { PeopleContext } from "./people/PeopleContext"
import { SsgFile } from "ssg-api/dist/src/util/file/SsgFile"

export interface RR0SsgContext extends SsgContext {
  readonly messages: RR0Messages
  readonly time: TimeContext

  clone(locale?: string): RR0SsgContext
}

export interface HtmlRR0SsgContext extends HtmlSsgContext {
  readonly messages: RR0Messages
  readonly time: TimeContext
  readonly people: PeopleContext
  readonly images: Set<string>

  clone(locale?: string): HtmlRR0SsgContext
}

export class RR0SsgContextImpl extends SsgContextImpl {

  readonly messages: RR0Messages
  readonly images = new Set<string>()
  protected readonly fileMap = new Map<string, SsgFile>()

  constructor(locale: string, readonly time: TimeContext, readonly people = new PeopleContext(),
              currentFile: SsgFile | undefined = undefined) {
    super(locale, new Map(), 'RR0', new ConsoleLogger('RR0'), currentFile);
    this.messages = ssgMessages[locale]
  }

  getInputFrom(filePath: string): SsgFile {
    let inputFile = this.fileMap.get(filePath)
    if (inputFile) {
      this.logger.debug("Reusing output file for", filePath)
    } else {
      inputFile = super.getInputFrom(filePath)
    }
    return inputFile
  }

  setOutputFrom(filePath: string): SsgFile {
    const outputFile = super.setOutputFrom(filePath)
    this.fileMap.set(filePath.substring("out/".length), outputFile)
    return outputFile
  }

  clone(locale = this.locale): RR0SsgContextImpl {
    return new RR0SsgContextImpl(locale, this.time.clone(), this.people.clone(), this._inputFile)
  }
}
