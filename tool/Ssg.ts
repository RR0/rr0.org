import {FileInfo} from "./FileUtil"
import {SsgContext} from "./SsgContext"
import {ReplaceCommand} from "./replace/ReplaceCommand"
import {SsgStep} from "./step/SsgStep"

export type ContentsConfig = {
  roots: string[],
  replacements: ReplaceCommand[],
  outputFile(inputFile: FileInfo): FileInfo
}
export type SsgConfig = {
  contents: ContentsConfig[]
  copies: string[]
  outDir: string
}

export type SsgResult = {}

export type OutputFunc = (context: SsgContext, info: FileInfo, outDir?: string) => Promise<void>

export class Ssg {

  protected steps: SsgStep[] = []

  constructor(protected config: SsgConfig) {
  }

  add(step: SsgStep) {
    this.steps.push(step)
    return this
  }

  async start(context: SsgContext): Promise<SsgResult> {
    const config = this.config
    const result: SsgResult = {}
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i]
      console.log(`Step #${i + 1}`)
      const stepResult = await step.execute(context, config)
      console.log(`Step result #${i + 1}`, stepResult)
      Object.assign(result, stepResult)
    }
    return result
  }
}
