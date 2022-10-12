import {SsgStep, SsgStepResult} from "./SsgStep"
import {OutputFunc, SsgConfig} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {dirNames} from "../util/file/FileUtil"
import {FileInfo, getFileInfo} from "../util/file/FileInfo"

export interface DirectoryResult extends SsgStepResult {
  directoryCount: number
}

export abstract class DirectoryStep implements SsgStep {

  protected constructor(protected dirs: string[], protected excludedDirs: string[], protected template: string,
                        protected outputFunc: OutputFunc) {
  }

  async execute(context: SsgContext, config: SsgConfig): Promise<DirectoryResult> {
    const fileInfo = getFileInfo(context, `${config.outDir}/${this.template}`)
    let dirames = (await this.findDirs(this.dirs))
      .filter(dirName => !this.excludedDirs.includes(dirName))
    await this.processDirs(context, dirames, fileInfo)
    return {directoryCount: dirames.length}
  }

  protected abstract processDirs(context: SsgContext, dirames: string[], fileInfo: FileInfo): Promise<void>

  private async findDirs(fromDirs: string[]) {
    let dirames: string[] = []
    for (let fromDir of fromDirs) {
      let subDirs: string[] = []
      if (fromDir.endsWith("/*/")) {
        const baseDir = fromDir.substring(0, fromDir.length - 3)
        if (baseDir.endsWith("/*")) {
          const dirs = (await this.findDirs([baseDir + "/"]))
            .filter(dirName => !this.excludedDirs.includes(dirName))
          for (const dir of dirs) {
            subDirs = subDirs.concat(await this.findDirs([dir + "/*/"]))
          }
        } else {
          subDirs = (await dirNames(baseDir)).map(x => baseDir + "/" + x)
        }
      } else {
        subDirs = [fromDir]
      }
      dirames = dirames.concat(subDirs)
    }
    return dirames
  }
}
