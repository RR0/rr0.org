import { SsgContext } from "ssg-api"

export class WitnessReplacer {

  replacement(context: SsgContext, match: string, witnessName: string, witnessNumber: string): string {
    const witnessLength = Math.max(6.5, witnessName.length)
    return `<span class="witness" title="Nom du témoin anonymisé" style="width:${witnessLength}em"><a href="/FAQ.html#privacy">témoin${witnessNumber ? " n° " + witnessNumber : ""}</a></span>`
  }
}
