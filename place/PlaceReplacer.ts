import {PlaceService} from "./PlaceService"
import {OrganizationService} from "../org/OrganizationService"
import {HtmlSsgContext} from "ssg-api"

export class PlaceReplacer {

  constructor(protected placeService: PlaceService, protected orgService: OrganizationService) {
  }

  async replacement(context: HtmlSsgContext, original: HTMLElement): Promise<HTMLElement> {
    let replacement: HTMLElement
    const address = original.textContent || ""
    const outputDoc = context.outputFile.dom.window.document
    replacement = outputDoc.createElement("span")
    replacement.setAttribute("onclick", `showMap('${address}')`)
    replacement.innerHTML = address
    replacement.className = "plac"
    replacement.translate = false
    context.debug("\tReplacing place", original.innerHTML, "with", replacement)
    return replacement
  }
}
