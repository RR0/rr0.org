import { HtmlRR0SsgContext } from "../../RR0SsgContext"

export class WitnessReplacer {

  protected now = new Date()

  private max = 60

  replacement(context: HtmlRR0SsgContext, match: string, witnessName: string, witnessNumber: string): string {
    if (this.now.getFullYear() - context.time.getYear() <= this.max) {
      const witnessLength = Math.max(6.5, witnessName.length)
      return `<span class="witness" title="Nom du témoin anonymisé" style="width:${witnessLength}em"><a href="/FAQ.html#privacy">témoin${witnessNumber ? " n° " + witnessNumber : ""}</a></span>`
    } else {
      return `<span class="witness-revelead" title="Nom du témoin révélé après ${this.max} ans">${witnessName}</span>`
    }
  }
}
