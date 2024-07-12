export class LocalAnchor {

  static create(outputDoc: Document, localAnchor: string): HTMLElement {
    const anchor = outputDoc.createElement("span")
    anchor.className = "anchor"
    anchor.ariaHidden = "true"
    anchor.id = localAnchor
    return anchor
  }
}
