import {FileInfo} from "../../../util/file/FileInfo"
import {SsgContext} from "../../../SsgContext"

export interface ReplaceCommand<C extends SsgContext> {

  execute(context: C): Promise<FileInfo>
}
