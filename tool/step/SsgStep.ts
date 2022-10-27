import {SsgContext} from "../SsgContext"
import {SsgConfig} from "../Ssg"

export type SsgStepResult = Record<string, any>

export interface SsgStep {
  /**
   * Execute the step.
   *
   * @param context
   * @param config
   */
  execute(context: SsgContext, config: SsgConfig): Promise<SsgStepResult>
}
