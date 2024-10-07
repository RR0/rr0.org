import { northKareliaMessages_fr } from "./region/nk/NorthKareliaMessages_fr.js"
import { FinlandMessages } from "./FinlandMessages.js"
import { pirkanmaaMessages_fr } from "./region/p/PirkanmaaMessages_fr.js"
import { southSavo_fr } from "./region/ss/SouthSavo_fr.js"

export const finland_fr = new FinlandMessages(["Finlande"], {
    nk: northKareliaMessages_fr,
  p: pirkanmaaMessages_fr,
  ss: southSavo_fr
  }
)
