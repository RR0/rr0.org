import {FileInfo} from "../../FileUtil"
import {RegexpReplaceCommand} from "../RegexpReplaceCommand"
import {SsgReplacer} from "../SsgReplacer"
import {SsgContext} from "../../SsgContext"

export class SsiVarReplaceCommand extends RegexpReplaceCommand {

  constructor(protected replacer: SsgReplacer) {
    super(/<!--\s*#set\s+var="(.+?)"\s+value="(.+?)"\s*-->/gs)
  }

  protected createReplacer(context: SsgContext, fileInfo: FileInfo): SsgReplacer {
    return this.replacer
  }
}
