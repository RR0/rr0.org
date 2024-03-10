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

export const franceMessages_fr = new FranceMessages("France")
franceMessages_fr[OrganizationType.region] = {
  ara: auvergneRhoneAlpesMessages,
  bfc: bourgogneFrancheComteMessages,
  cvl: centreValDeLoireMessages,
  ges: grandEstMessages,
  gua: guadeloupeMessages_fr,
  idf: idfMessages,
  hdf: hautsDeFranceMessages,
  lre: laReunionMessages_fr,
  nor: normandieMessages_fr,
  pac: pacaMessages,
  pdl: paysDeLoireMessages,
  naq: nouvelleAquitaineMessages,
  occ: occitanieMessages_fr
}
