import {ReplacerFactory} from "../../ReplacerFactory"
import {DomReplaceCommand} from "../../DomReplaceCommand"
import {DomReplacer} from "../../DomReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

/**
 * A replacer that looks for a class in tags.
 */
export class ClassDomReplaceCommand<T extends HTMLElement = HTMLElement> extends DomReplaceCommand<T> {

  constructor(protected className: string, protected replacerFactory: ReplacerFactory<DomReplacer<T>>) {
    super(`.${className}`)
  }

  protected createReplacer(context: HtmlSsgContext): Promise<DomReplacer<T>> {
    return this.replacerFactory.create(context)
  }
}
