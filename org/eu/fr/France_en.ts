import { FranceMessages } from "./FranceMessages"
import { auvergneRhoneAlpesMessages } from "./region/ara/AuvergneRhoneAlpesMessages"
import { idfMessages } from "./region/idf/IdfMessages"
import { pacaMessages } from "./region/pac/PacaMessages"
import { paysDeLoireMessages } from "./region/pdl/PaysDeLoireMessages"
import { nouvelleAquitaineMessages } from "./region/naq/NouvelleAquitaineMessages"
import { bourgogneFrancheComteMessages } from "./region/bfc/BourgogneFrancheComteMessages"
import { occitanieMessages_en } from "./region/occ/OccitanieMessages_en"
import { hautsDeFranceMessages } from "./region/hdf/HautsDeFranceMessages"
import { grandEstMessages } from "./region/ges/GrandEstMessages"
import { normandieMessages_en } from "./region/nor/NormandieMessages_en"
import { laReunionRegion_en } from "./region/lre/LaReunionRegion_en"
import { OrganizationType } from "../../Organization"
import { centreValDeLoireMessages } from "./region/cvl/CentreValDeLoireMessages"
import { guadeloupeRegion_en } from "./region/gua/GuadeloupeRegion_en"
import { bretagneMessages_en } from "./region/bre/BretagneMessages_en"
import { FranceRegionCode } from "./region/FranceRegionCode"
import { martiniqueRegionMessage } from "./region/mtq/MartiniqueRegionMessage"
import { collectiviteOutreMerMessage_en } from "./region/com/CollectiviteOutreMerMessage_en"

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
