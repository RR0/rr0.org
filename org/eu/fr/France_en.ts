import { FranceMessages } from "./FranceMessages.js"
import { auvergneRhoneAlpesMessages } from "./region/ara/AuvergneRhoneAlpesMessages.js"
import { idfMessages } from "./region/idf/IdfMessages.js"
import { pacaMessages } from "./region/pac/PacaMessages.js"
import { paysDeLoireMessages } from "./region/pdl/PaysDeLoireMessages.js"
import { nouvelleAquitaineMessages } from "./region/naq/NouvelleAquitaineMessages.js"
import { bourgogneFrancheComteMessages } from "./region/bfc/BourgogneFrancheComteMessages.js"
import { occitanieMessages_en } from "./region/occ/OccitanieMessages_en.js"
import { hautsDeFranceMessages } from "./region/hdf/HautsDeFranceMessages.js"
import { grandEstMessages } from "./region/ges/GrandEstMessages.js"
import { normandieMessages_en } from "./region/nor/NormandieMessages_en.js"
import { laReunionRegion_en } from "./region/lre/LaReunionRegion_en.js"
import { OrganizationType } from "../../Organization.js"
import { centreValDeLoireMessages } from "./region/cvl/CentreValDeLoireMessages.js"
import { guadeloupeRegion_en } from "./region/gua/GuadeloupeRegion_en.js"
import { bretagneMessages_en } from "./region/bre/BretagneMessages_en.js"
import { FranceRegionCode } from "./region/FranceRegionCode.js"
import { martiniqueRegionMessage } from "./region/mtq/MartiniqueRegionMessage.js"
import { collectiviteOutreMerMessage_en } from "./region/com/CollectiviteOutreMerMessage_en.js"

export const france_en = new FranceMessages("France")
france_en[OrganizationType.region] = {
  ara: auvergneRhoneAlpesMessages,
  bre: bretagneMessages_en,
  bfc: bourgogneFrancheComteMessages,
  com: collectiviteOutreMerMessage_en,
  cvl: centreValDeLoireMessages,
  ges: grandEstMessages,
  gua: guadeloupeRegion_en,
  idf: idfMessages,
  hdf: hautsDeFranceMessages,
  [FranceRegionCode.mtq]: martiniqueRegionMessage,
  lre: laReunionRegion_en,
  nor: normandieMessages_en,
  pac: pacaMessages,
  pdl: paysDeLoireMessages,
  naq: nouvelleAquitaineMessages,
  occ: occitanieMessages_en
}
