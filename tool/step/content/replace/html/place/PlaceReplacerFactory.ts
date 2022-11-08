import {ReplacerFactory} from "../../ReplacerFactory"
import {PlaceReplacer} from "./PlaceReplacer"
import {DomReplacer} from "../../DomReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {PlaceService} from "../../../../../model/place/PlaceService"
import {OrganizationService} from "../../../../../../org/OrganizationService"

/**
 * Creates replacers for place HTML in a given context.
 */
export class PlaceReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected singleton?: PlaceReplacer

  constructor(private placeService: PlaceService, protected orgService: OrganizationService) {
  }

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const instance = new PlaceReplacer(this.placeService, this.orgService)
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return instance.replacement(context, original)
      }
    }
  }
}
