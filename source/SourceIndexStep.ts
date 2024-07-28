import { FileUtil, SsgContext, SsgStep } from "ssg-api"
import { SourceRegistry } from "./SourceRegistry"

/**
 * Saves the index file collected by the SourceCommand.
 */
export class SourceIndexStep implements SsgStep {

  constructor(protected fileName: string, protected sourceCommand: SourceRegistry) {
  }

  execute(context: SsgContext): Promise<any> {
    context.log("Saving sources index at", this.fileName)
    const index = this.sourceCommand.registry
    const indexJson = JSON.stringify(index)
    return FileUtil.writeFile(this.fileName, indexJson, "utf-8")
  }
}
