import {ReplacerFactory} from "../../ReplacerFactory"
import {PlaceReplacer} from "./PlaceReplacer"
import {DomReplacer} from "../../DomReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {PlaceService} from "../../../../../model/place/PlaceService"

/**
 * Creates replacers for place HTML in a given context.
 */
export class PlaceReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected singleton?: PlaceReplacer

  constructor(private service: PlaceService) {
  }

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const instance = new PlaceReplacer(this.service)
    return {
      async replace(original: Element): Promise<Element> {
        return instance.replacement(context, original)
      }
    }
  }
}
