import {SsgStep, SsgStepResult} from "./SsgStep"
import {SsgConfig} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {ssgCopy} from "../util/file/FileUtil"

export class CopyStep implements SsgStep {

  constructor(protected copies: string[]) {
  }

  async execute(context: SsgContext, config: SsgConfig): Promise<SsgStepResult> {
    const copies: string[] = this.copies
    const dest = config.outDir
    try {
      console.log("Copying to", dest, copies)
      const files = await ssgCopy(dest, ...copies)
      return {
        filesCount: files.length
      }
    } catch (e) {
      throw Error("Could not copy" + copies + " because of " + e)
    }
  }
}
