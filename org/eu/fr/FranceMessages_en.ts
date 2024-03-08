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

export const franceMessages_en = new FranceMessages("France")
franceMessages_en[OrganizationType.region] = {
  ara: auvergneRhoneAlpesMessages,
  bfc: bourgogneFrancheComteMessages,
  cvl: centreValDeLoireMessages,
  ges: grandEstMessages,
  idf: idfMessages,
  hdf: hautsDeFranceMessages,
  lre: laReunionMessages_en,
  nor: normandieMessages_en,
  pac: pacaMessages,
  pdl: paysDeLoireMessages,
  naq: nouvelleAquitaineMessages,
  occ: occitanieMessages_en
}
