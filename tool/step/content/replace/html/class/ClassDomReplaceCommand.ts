import {ReplacerFactory} from "../../ReplacerFactory"
import {SsgContext} from "../../../../../SsgContext"
import {DomReplaceCommand} from "../../DomReplaceCommand"
import {DomReplacer} from "../../DomReplacer"

/**
 *
 */
export class ClassDomReplaceCommand extends DomReplaceCommand {

  constructor(protected className: string, protected replacerFactory: ReplacerFactory<DomReplacer>) {
    super(`.${className}`)
  }

  protected createReplacer(context: SsgContext): Promise<DomReplacer> {
    return this.replacerFactory.create(context)
  }
}
