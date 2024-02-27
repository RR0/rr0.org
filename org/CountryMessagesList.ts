import { CountryCode } from "./country/CountryCode"
import { CountryMessages } from "./country/CountryMessages"
import { FranceRegionsMessagesList } from "./eu/fr/FranceMessages"
import { UsaRegionMessagesList } from "./us/UsaMessages"
import { FinlandRegionsMessagesList } from "./eu/fi/FinlandMessages"

export type CountryMessagesList
  = { [key in CountryCode]: CountryMessages }
  & { fi: CountryMessages<FinlandRegionsMessagesList> }
  & { us: CountryMessages<UsaRegionMessagesList> }
  & { fr: CountryMessages<FranceRegionsMessagesList> }
