import {PlaceReplacer} from "./PlaceReplacer"
import {PlaceService} from "./PlaceService"
import {OrganizationService} from "../org/OrganizationService"
import {DomReplacer, HtmlSsgContext, ReplacerFactory} from "ssg-api"

/**
 * Creates replacers for place HTML in a given context.
 */
export class PlaceReplacerFactory implements ReplacerFactory<DomReplacer> {

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
