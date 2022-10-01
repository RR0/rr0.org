import {SsgContext} from "../SsgContext"
import {FileInfo} from "../FileUtil"

export interface ReplaceCommand {
  execute(context: SsgContext): Promise<FileInfo>
}
