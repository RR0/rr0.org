import { northKareliaMessages_en } from "./region/nk/NorthKareliaMessages_en"
import { FinlandMessages } from "./FinlandMessages"
import { pirkanmaaMessages_en } from "./region/p/PirkanmaaMessages_en"

export const finland_en = new FinlandMessages(
  ["Finland"],
  {
    nk: northKareliaMessages_en,
    p: pirkanmaaMessages_en
  }
)
