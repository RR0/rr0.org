import { HtmlSsgContext } from "ssg-api"

export class PlaceReplacer {

  async replacement(context: HtmlSsgContext, original: HTMLElement): Promise<HTMLElement> {
    let replacement: HTMLElement
    const classes = Array.from(original.classList).filter(clazz => clazz !== "place")
    const mode = classes[0] || "place"
    const address = original.textContent ? original.textContent.replace(/\n/g, " ") : ""
    const outputDoc = context.file.document
    replacement = outputDoc.createElement("span")
    const params = original.dataset["params"]
    const mapAddress = params ?? address
    replacement.setAttribute("onclick", `showMap(event,"${mapAddress}",true,"${mode}")`)
    replacement.innerHTML = address
    replacement.className = "plac"
    replacement.translate = false
    context.debug("\tReplacing place", original.innerHTML, "with", replacement)
    return replacement
  }
}
