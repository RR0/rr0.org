import { FranceMessages } from "./FranceMessages"
import { auvergneRhoneAlpesMessages } from "./region/ara/AuvergneRhoneAlpesMessages"
import { idfMessages } from "./region/idf/IdfMessages"
import { pacaMessages } from "./region/pac/PacaMessages"
import { paysDeLoireMessages } from "./region/pdl/PaysDeLoireMessages"
import { nouvelleAquitaineMessages } from "./region/naq/NouvelleAquitaineMessages"
import { occitanieMessages_fr } from "./region/occ/OccitanieMessages_fr"
import { bourgogneFrancheComteMessages } from "./region/bfc/BourgogneFrancheComteMessages"
import { hautsDeFranceMessages } from "./region/hdf/HautsDeFranceMessages"
import { normandieMessages_fr } from "./region/nor/NormandieMessages_fr"
import { grandEstMessages } from "./region/ges/GrandEstMessages"
import { laReunionMessages_fr } from "./region/lre/LaReunionMessages_fr"
import { OrganizationType } from "../../Organization"
import { centreValDeLoireMessages } from "./region/cvl/CentreValDeLoireMessages"
import { guadeloupeMessages_fr } from "./region/gua/GuadeloupeMessages_fr"
import { bretagneMessages_fr } from "./region/bre/BretagneMessages_fr"
import { martiniqueRegionMessage } from "./region/mtq/MartiniqueRegionMessage"
import { FranceRegionCode } from "./region/FranceRegionCode"
import { collectiviteOutreMerMessage_fr } from "./region/com/CollectiviteOutreMerMessage_fr"

export const france_fr = new FranceMessages("France")
france_fr[OrganizationType.region] = {
  ara: auvergneRhoneAlpesMessages,
  bre: bretagneMessages_fr,
  bfc: bourgogneFrancheComteMessages,
  com: collectiviteOutreMerMessage_fr,
  cvl: centreValDeLoireMessages,
  ges: grandEstMessages,
  gua: guadeloupeMessages_fr,
  idf: idfMessages,
  hdf: hautsDeFranceMessages,
  lre: laReunionMessages_fr,
  [FranceRegionCode.mtq]: martiniqueRegionMessage,
  nor: normandieMessages_fr,
  pac: pacaMessages,
  pdl: paysDeLoireMessages,
  naq: nouvelleAquitaineMessages,
  occ: occitanieMessages_fr
}
