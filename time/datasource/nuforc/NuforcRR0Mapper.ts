import { CaseMapper } from "../CaseMapper"
import { NuforcCase, NuforcCountry, NuforcShape } from "./NuforcCase"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { OnlineSource } from "../../../source/OnlineSource"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { NamedPlace, RR0Case } from "../../RR0Case"
import assert from "assert"
import { CountryService } from "../../../org/country/CountryService"
import { australia } from "../../../org/au/Australia"
import { canada } from "../../../org/ca/Canada"
import { india } from "../../../org/in/Country_in"
import { usa } from "../../../org/us/Usa"
import { brazil } from "../../../org/br/Brazil"
import { newZealand } from "../../../org/nz/NewZealand"

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
    protected cityService: CityService, protected countryService: CountryService,
    readonly baseUrl: string,
    readonly copyright: string, readonly author: string
  ) {
  }

  getDescription(c: NuforcCase): string {
    const description = ["observation"]
    description.push(this.translations[c.shape])
    return description.join(", ")
  }

  static readonly countryMap: { [key in NuforcCountry]: string } = {
    Brazil: brazil.code,
    Australia: australia.code,
    Canada: canada.code,
    NewZealand: newZealand.code,
    India: india.code,
    USA: usa.code
  }

  map(context: HtmlRR0SsgContext, sourceCase: NuforcCase, sourceTime: Date): RR0Case {
    const caseSource = new OnlineSource(sourceCase.url, "cas n° " + sourceCase.caseNumber,
      [this.author],
      {publisher: this.copyright, time: sourceTime.toLocaleString()})
    assert.ok(sourceCase.country, `NUFORC country code is ${sourceCase.country}`)
    const countryCode = NuforcRR0Mapper.countryMap[sourceCase.country]
    assert.ok(countryCode, `Could not find RR0 country to map from NUFORC code ${countryCode}`)
    const country = this.countryService.get(countryCode)
    assert.ok(country, `Could not find country "${countryCode}"`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(sourceCase.city)
    const placeName = placeItems[1]
    const city = this.cityService.find(context, placeName, undefined)
    assert.ok(city,
      `Could not find city of name "${placeName}" in state "${sourceCase.state}" of country "${countryCode}"`)
    const place: NamedPlace = {name: city.title(context), place: city.places[0]}
    return {
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}
