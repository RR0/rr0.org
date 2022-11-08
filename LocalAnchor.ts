import {HtmlTag} from "./util/HtmlTag"

export class LocalAnchor {

  static create(outputDoc: Document, localAnchor: string): HTMLElement {
    const anchor = outputDoc.createElement("span")
    anchor.className = "anchor"
    anchor.ariaHidden = "true"
    anchor.id = localAnchor
    return anchor
  }

  static createHTML(outputDoc: Document, localAnchor: string): string {
    return HtmlTag.toString("span", "", {class: "anchor", "aria-hidden": true, id: localAnchor})
  }
}
