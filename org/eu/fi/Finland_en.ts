import { northKareliaMessages_en } from "./region/nk/NorthKareliaMessages_en.js"
import { FinlandMessages } from "./FinlandMessages.js"
import { pirkanmaaMessages_en } from "./region/p/PirkanmaaMessages_en.js"
import { southSavo_en } from "./region/ss/SouthSavo_en.js"

export const finland_en = new FinlandMessages(["Finland"], {
    nk: northKareliaMessages_en,
  p: pirkanmaaMessages_en,
  ss: southSavo_en
  }
)
