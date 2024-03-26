import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"
import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"

export const essexPoliceTestCases: EssexPoliceCaseSummary[] = [
  {
    caseNumber: "1",
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 2018),
    url: new URL(
      "https://www.essex.police.uk/foi-ai/essex-police/other-information/previous-foi-requests/ufo-reports-2018-to-2023/"),
    district: "M25",
    comments: "INC HAPPENED ABOUT 4 MINS AGO INF SAW A GREEN FLOURESCENT LIGHT LIKE A COMET COMING FROM THE SKY, INF SAW 2 PLANES ABOVE IT AND A SMALLER PLANE"
  },
  {
    caseNumber: "2019",
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 2019),
    url: new URL(
      "https://www.essex.police.uk/foi-ai/essex-police/other-information/previous-foi-requests/ufo-reports-2018-to-2023/"),
    district: "BASILDON",
    comments: `INFT HEARD A HGIH PITCH NOISE AT AROUND 00:00HRS
INFT STATING THIS WAS ABOUT 300FT HIGH
IT WAS THERE FOR ABOUT 12-14 MINUTES, INFT THEN WENT BACK INSIDE AND DID NOT SEE WHERE THE UFO HEADED ONCE IT LEFT`
  },
]
