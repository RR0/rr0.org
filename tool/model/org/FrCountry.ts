import {Country, CountryMessages} from "./Country"
import {CountryCode} from "./CountryCode"
import {Organization} from "./index"
import {SsgContext} from "../../SsgContext"

export enum FrenchRegionCode {
  /**
   * Ile-De-France
   */
  idf = "idf"
}

export interface FrCountryMessages extends CountryMessages {
  region: { [key in FrenchRegionCode]: string }
}

export class FrenchRegion implements Organization {

  constructor(readonly code: FrenchRegionCode, readonly dirName: string) {
  }

  title(context: SsgContext): string {
    return context.messages.country.fr.region[this.code]
  }
}

export class FrCountry extends Country<FrenchRegionCode, FrenchRegion> {

  protected readonly regions: { [key in FrenchRegionCode]: FrenchRegion } = {
    idf: new FrenchRegion(FrenchRegionCode.idf, FrenchRegionCode.idf + "/")
  }

  constructor(dirName: string) {
    super(CountryCode.fr, dirName)
  }

  level1(code: FrenchRegionCode): FrenchRegion {
    return this.regions[code]
  }
}
