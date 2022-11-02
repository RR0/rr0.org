import {FrCountry} from "./FrCountry"
import {UsCountry} from "./UsCountry"
import {CountryCode} from "./CountryCode"
import {Country} from "./Country"

export class Countries {
  static readonly instances = new Map<CountryCode, Country<any, any>>()
}

const orgDirName = "org/"
const euDirName = orgDirName + "eu/"
Countries.instances.set(CountryCode.fr, new FrCountry(euDirName + "fr/"))
Countries.instances.set(CountryCode.us, new UsCountry(orgDirName + "us/"))
