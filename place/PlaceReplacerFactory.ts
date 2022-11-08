import {ReplacerFactory} from "../tool/step/content/replace/ReplacerFactory"
import {PlaceReplacer} from "./PlaceReplacer"
import {DomReplacer} from "../tool/step/content/replace/DomReplacer"
import {HtmlSsgContext} from "../tool/HtmlSsgContext"
import {PlaceService} from "./PlaceService"
import {OrganizationService} from "../org/OrganizationService"

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
