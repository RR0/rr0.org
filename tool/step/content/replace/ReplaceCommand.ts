import {FileInfo} from "../../../util/file/FileInfo"
import {HtmlSsgContext} from "../../../HtmlSsgContext"

export interface ReplaceCommand {

  execute(context: HtmlSsgContext): Promise<FileInfo>
}
