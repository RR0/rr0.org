import {SsgContext} from "./SsgContext"
import {SsgStep} from "./step/SsgStep"
import {FileInfo} from "./util/file/FileInfo"


export type SsgConfig = {
  outDir: string
}

export type SsgResult = {}

export type OutputFunc = (context: SsgContext, info: FileInfo, outDir?: string) => Promise<void>

export class Ssg {

  protected steps: SsgStep[] = []

  constructor(protected config: SsgConfig) {
  }

  add(...steps: SsgStep[]) {
    this.steps.push(...steps)
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
