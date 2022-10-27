import {UrlUtil} from "../../../../../util/url/UrlUtil"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {PlaceService} from "../../../../../model/place/PlaceService"

export class PlaceReplacer {

  constructor(protected service: PlaceService) {
  }

  async replacement(context: HtmlSsgContext, original: Element): Promise<Element> {
    let placeStr = original.innerHTML || ""
    let place = await this.service.get(placeStr)
    const titleAttr = placeStr.indexOf(place.title) < 0 ? ` title="${place.title}"` : ""
    let url = place.dirName
    let replacement: HTMLElement
    const currentFileName = context.inputFile.name
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    const outputDoc = context.outputFile.dom.window.document
    if (url && url !== dirName) {
      const anchor = replacement = outputDoc.createElement("a") as HTMLAnchorElement
      anchor.href = UrlUtil.absolute(url)
    } else {
      replacement = outputDoc.createElement("span")
    }
    replacement.title = titleAttr
    replacement.innerHTML = placeStr
    replacement.translate = false
    const location = place.location
    if (location) {
      replacement.setAttribute("onclick", `showMap(${location.lat},${location.lng})`)
    }
    context.debug("\tReplacing place", original.innerHTML, "with", replacement)
    return replacement
  }
}
