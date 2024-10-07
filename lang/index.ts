import { RR0Messages_fr } from "./RR0Messages_fr.js"
import { RR0Messages_en } from "./RR0Messages_en.js"
import { RR0Messages } from "./RR0Messages.js"

export const ssgMessages: { [lang: string]: RR0Messages } = {
  "fr": new RR0Messages_fr(),
  "en": new RR0Messages_en()
}
