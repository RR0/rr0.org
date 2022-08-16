import {SsgMessages_fr} from "./SsgMessages_fr"
import {SsgMessages_en} from "./SsgMessages_en"
import {SsgMessages} from "./SsgMessages"

export const ssgMessages: { [lang: string]: SsgMessages } = {
  "fr": new SsgMessages_fr(),
  "en": new SsgMessages_en()
}
