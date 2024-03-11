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
import { laReunionMessages_en } from "./region/lre/LaReunionMessages_en"
import { OrganizationType } from "../../Organization"
import { centreValDeLoireMessages } from "./region/cvl/CentreValDeLoireMessages"
import { guadeloupeMessages_en } from "./region/gua/GuadeloupeMessages_en"
import { bretagneMessages_en } from "./region/bre/BretagneMessages_en"

export const franceMessages_en = new FranceMessages("France")
franceMessages_en[OrganizationType.region] = {
  ara: auvergneRhoneAlpesMessages,
  bre: bretagneMessages_en,
  bfc: bourgogneFrancheComteMessages,
  cvl: centreValDeLoireMessages,
  ges: grandEstMessages,
  gua: guadeloupeMessages_en,
  idf: idfMessages,
  hdf: hautsDeFranceMessages,
  lre: laReunionMessages_en,
  nor: normandieMessages_en,
  pac: pacaMessages,
  pdl: paysDeLoireMessages,
  naq: nouvelleAquitaineMessages,
  occ: occitanieMessages_en
}
