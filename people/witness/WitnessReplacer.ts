import { HtmlRR0SsgContext } from "../../RR0SsgContext.js"

export class WitnessReplacer {

  protected now = new Date()

  private max = 60

  /**
   *
   * @param context
   * @param witnessName The actual name of the witness (even if to be anonymized)
   * @param witnessId The unique id (a number typically) to identify the witness in this case.
   */
  replacement(context: HtmlRR0SsgContext, witnessName: string, witnessId?: string): HTMLElement {
    const doc = context.file.document
    const span = doc.createElement("span")
    if (this.now.getFullYear() - context.time.getYear() <= this.max) {
      const witnessLength = Math.max(6.5, witnessName.length)
      span.className = "witness"
      span.title = "Nom du témoin anonymisé"
      span.style.width = witnessLength + "em"
      const privacyLink = doc.createElement("a")
      privacyLink.href = "/FAQ.html#privacy"
      privacyLink.textContent = `témoin${witnessId ? " n° " + witnessId : ""}`
      span.append(privacyLink)
    } else {
      span.className = "witness-revelead"
      span.title = `Nom du témoin révélé après ${this.max} ans`
      span.textContent = witnessName
    }
    return span
  }
}
