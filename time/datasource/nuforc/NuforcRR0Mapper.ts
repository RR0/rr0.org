import { CaseMapper } from "../CaseMapper"
import { NuforcCase, NuforcShape } from "./NuforcCase"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { NamedPlace, RR0Case } from "../../RR0Case"
import assert from "assert"
import { RegionService } from "../../../org/country/region/RegionService"
import { CountryService } from "../../../org/country/CountryService"
import { australia } from "../../../org/au/Country_au"
import { canada } from "../../../org/ca/Canada"
import { india } from "../../../org/in/Country_in"
import { usa } from "../../../org/us/Usa"

export class NuforcRR0Mapper implements CaseMapper<HtmlRR0SsgContext, NuforcCase, RR0Case> {

  readonly translations: { [key in NuforcShape]: string } = {
    [NuforcShape.Circle]: "d'un cercle",
    [NuforcShape.Disk]: "d'un disque",
    [NuforcShape.Light]: "d'une lumière",
    [NuforcShape.Cylinder]: "d'un cylindre",
    [NuforcShape.Cigar]: "d'un d'un cigare",
    [NuforcShape.Chevron]: "d'un chevron",
    [NuforcShape.Cone]: "d'un cône",
    [NuforcShape.Cube]: "d'un cube",
    [NuforcShape.Changing]: "de forme changeante",
    [NuforcShape.Diamond]: "d'un diamant",
    [NuforcShape.Flash]: "d'un éclair lumineux",
    [NuforcShape.Formation]: "d'une formation",
    [NuforcShape.Orb]: "d'un orbe",
    [NuforcShape.Oval]: "d'une forme ovale",
    [NuforcShape.Other]: "d'une forme indéterminée",
    [NuforcShape.Rectangle]: "d'un rectangle",
    [NuforcShape.Sphere]: "d'un sphère",
    [NuforcShape.Star]: "d'une étoile",
    [NuforcShape.Teardrop]: "d'un goutte",
    [NuforcShape.Triangle]: "d'un triangle",
    [NuforcShape.Unknown]: "d'une forme inconnue"
  }

  constructor(
    protected cityService: CityService, protected regionService: RegionService,
    protected countryService: CountryService,
    readonly baseUrl: string, readonly copyright: string, readonly author: string
  ) {
  }

  protected getDescription(c: NuforcCase): string {
    const description = ["observation"]
    description.push(this.translations[c.shape])
    return description.join(", ")
  }

  static readonly countryMap = {
    Australia: australia.code,
    Canada: canada.code,
    India: india.code,
    USA: usa.code
  }

  map(context: HtmlRR0SsgContext, sourceCase: NuforcCase, sourceTime: Date): RR0Case {
    const caseSource = new OnlineSource(sourceCase.url, "cas n° " + sourceCase.caseNumber,
      [this.author],
      {publisher: this.copyright, time: sourceTime.toLocaleString()})
    const stateCode = sourceCase.state.toLowerCase()
    const countryCode = NuforcRR0Mapper.countryMap[sourceCase.country]
    const country = this.countryService.get(countryCode)
    assert.ok(country, `Could not find country "${countryCode}"`)
    const state = this.regionService.get(stateCode, country)
    assert.ok(state, `Could not find state "${stateCode}"`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(sourceCase.city)
    const placeName = placeItems[1]
    const city = this.cityService.find(context, placeName, undefined)
    assert.ok(city, `Could not find city of name "${placeName}"`)
    const place: NamedPlace = {name: city.title(context), place: city.places[0]}
    return {
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}
