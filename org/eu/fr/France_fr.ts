import { FranceMessages } from "./FranceMessages.js"
import { auvergneRhoneAlpesMessages } from "./region/ara/AuvergneRhoneAlpesMessages.js"
import { idfMessages } from "./region/idf/IdfMessages.js"
import { pacaMessages } from "./region/pac/PacaMessages.js"
import { paysDeLoireMessages } from "./region/pdl/PaysDeLoireMessages.js"
import { nouvelleAquitaineMessages } from "./region/naq/NouvelleAquitaineMessages.js"
import { occitanieMessages_fr } from "./region/occ/OccitanieMessages_fr.js"
import { bourgogneFrancheComteMessages } from "./region/bfc/BourgogneFrancheComteMessages.js"
import { hautsDeFranceMessages } from "./region/hdf/HautsDeFranceMessages.js"
import { normandieMessages_fr } from "./region/nor/NormandieMessages_fr.js"
import { grandEstMessages } from "./region/ges/GrandEstMessages.js"
import { laReunionRegion_fr } from "./region/lre/LaReunionRegion_fr.js"
import { OrganizationType } from "../../Organization.js"
import { centreValDeLoireMessages } from "./region/cvl/CentreValDeLoireMessages.js"
import { guadeloupeRegion_fr } from "./region/gua/GuadeloupeRegion_fr.js"
import { bretagneMessages_fr } from "./region/bre/BretagneMessages_fr.js"
import { martiniqueRegionMessage } from "./region/mtq/MartiniqueRegionMessage.js"
import { FranceRegionCode } from "./region/FranceRegionCode.js"
import { collectiviteOutreMerMessage_fr } from "./region/com/CollectiviteOutreMerMessage_fr.js"

export const france_fr = new FranceMessages("France")
france_fr[OrganizationType.region] = {
  ara: auvergneRhoneAlpesMessages,
  bre: bretagneMessages_fr,
  bfc: bourgogneFrancheComteMessages,
  com: collectiviteOutreMerMessage_fr,
  cvl: centreValDeLoireMessages,
  ges: grandEstMessages,
  gua: guadeloupeRegion_fr,
  idf: idfMessages,
  hdf: hautsDeFranceMessages,
  lre: laReunionRegion_fr,
  [FranceRegionCode.mtq]: martiniqueRegionMessage,
  nor: normandieMessages_fr,
  pac: pacaMessages,
  pdl: paysDeLoireMessages,
  naq: nouvelleAquitaineMessages,
  occ: occitanieMessages_fr
}
