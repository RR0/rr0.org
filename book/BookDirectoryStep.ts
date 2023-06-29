import {HtmlRR0SsgContext} from "../RR0SsgContext"
import {DirectoryStep, OutputFunc, SsgConfig, SsgStep} from "ssg-api"
import {RR0FileUtil} from "../util/file/RR0FileUtil"

/**
 * Scan directories for book information, then populates a template with collected data.
 */
export class BookDirectoryStep extends DirectoryStep {

  constructor(dirs: string[], template: string, protected outputFunc: OutputFunc,
              config: SsgConfig, name = "books") {
    super(dirs, [], template, config, name)
  }

  static async create(outputFunc: OutputFunc, config: SsgConfig): Promise<SsgStep[]> {
    const dirs = await RR0FileUtil.findDirectoriesContaining("book*.json")
    const excludedDirs = []

    const step = new BookDirectoryStep(
      dirs,
      "people/index.html",
      outputFunc, config,
      "all people directories"
    )
    return [step]
  }

  protected async processDirs(context: HtmlRR0SsgContext, dirNames: string[]): Promise<void> {
  }
}
