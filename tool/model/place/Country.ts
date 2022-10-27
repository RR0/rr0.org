import {CountryCode} from "./CountryCode"

export class State {

  constructor(readonly code: string, readonly dirName: string) {
  }
}

export class Country {

  static readonly instances = new Map<CountryCode, Country>()

  constructor(readonly code: CountryCode, readonly states: Map<string, State>, readonly dirName?: string) {
  }
}

const orgDirName = "org/"
{
  const euDirName = orgDirName + "eu/"
  {
    const franceDirName = euDirName + "fr/"
    const frenchRegionsDirName = franceDirName + "dept/"
    const frenchRegions = new Map<string, State>()
    frenchRegions.set("idf", new State("idf", frenchRegionsDirName + "idf/"))
    const france = new Country(CountryCode.fr, frenchRegions, franceDirName)
    Country.instances.set(CountryCode.fr, france)
  }
}
{
  const usDirName = orgDirName + "us/state/"
  const usaStates = new Map<string, State>()
  usaStates.set("nm", new State("nm", usDirName + "nm/"))
  usaStates.set("tn", new State("tn", usDirName + "tn/"))
  const usa = new Country(CountryCode.us, usaStates)
  Country.instances.set(CountryCode.us, usa)
}
