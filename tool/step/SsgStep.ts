import {SsgContext} from "../SsgContext"
import {SsgConfig} from "../Ssg"

export type SsgStepResult = Record<string, any>

export interface SsgStep {
  execute(context: SsgContext, config: SsgConfig): Promise<SsgStepResult>
}
