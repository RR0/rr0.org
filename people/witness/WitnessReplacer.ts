import {SsgContext} from "../../tool/SsgContext"

export class WitnessReplacer {

  replacement(context: SsgContext, match: string, witnessName: string, witnessNumber: string): string {
    return `<span class="witness" title="Nom du témoin anonymisé" style="width:${witnessName.length}em"><a href="/FAQ.html#privacy">témoin${witnessNumber ? " n° " + witnessNumber : ""}</a></span>`
  }
}
