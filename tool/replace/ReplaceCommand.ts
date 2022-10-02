import {SsgContext} from "../SsgContext"
import {FileInfo} from "../util/file/FileUtil"

export interface ReplaceCommand {
  execute(context: SsgContext): Promise<FileInfo>
}
