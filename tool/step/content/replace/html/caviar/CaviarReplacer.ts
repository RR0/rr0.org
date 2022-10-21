import {SsgContext} from "../../../../../SsgContext"

export class CaviarReplacer {

  replacement(context: SsgContext, match: string, witnessName: string, witnessNumber: string): string {
    return `<span class="witness" title="Témoin n° ${witnessNumber}">${"X".repeat(witnessName.length)}</span>`
  }
}
