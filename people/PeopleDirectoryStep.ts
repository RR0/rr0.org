import { Occupation } from "./Occupation.js"
import { People } from "./People.js"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"
import { HtmlTag } from "../util/html/HtmlTag.js"
import { DirectoryStep, OutputFunc, SsgConfig } from "ssg-api"
import { StringUtil } from "../util/string/StringUtil.js"
import { PeopleService } from "./PeopleService.js"
import { CountryCode } from "../org/country/CountryCode.js"
import { Gender } from "@rr0/common"

export type PeopleFilter = (p: People) => boolean

export function peopleOccupationFilter(filterOccupations: Occupation[]): PeopleFilter {
  return (p: People) => p.occupations.some(o => filterOccupations.includes(o))
}

/**
 * Scan directories for people information, then populates a template with collected data.
 */
export class PeopleDirectoryStep extends DirectoryStep {

  constructor(name: string, rootDirs: string[], excludedDirs: string[], templateFileName: string,
              protected outputFunc: OutputFunc, config: SsgConfig, protected service: PeopleService,
              protected filter: PeopleFilter = (_people: People) => true) {
    super({rootDirs, excludedDirs, templateFileName, getOutputPath: config.getOutputPath}, name)
  }

  protected async processDirs(context: HtmlRR0SsgContext, dirNames: string[]): Promise<void> {
    const allPeopleList = await this.service.getAll()
    let peopleList = allPeopleList.filter(this.filter)
    const outputPath = this.config.getOutputPath(context)
    const output = context.newOutput(outputPath)
    const pseudoPeopleList = peopleList.reduce((prevPeopleList: People[], peopleInfo: People) => {
      if (peopleInfo.pseudonyms?.length > 0) {
        for (const pseudonym of peopleInfo.pseudonyms) {
          const pseudo = new People(peopleInfo.firstNames, peopleInfo.lastName, peopleInfo.pseudonyms,
            peopleInfo.occupations, peopleInfo.countries,
            peopleInfo.discredited, peopleInfo.birthTime, peopleInfo.deathTime, peopleInfo.gender, peopleInfo.id,
            peopleInfo.dirName,
            peopleInfo.image)
          pseudo.lastAndFirstName = pseudonym
          prevPeopleList.push(pseudo)
        }
      }
      return prevPeopleList
    }, [])
    peopleList = peopleList.concat(pseudoPeopleList).sort(
      (p1, p2) => p1.lastAndFirstName.localeCompare(p2.lastAndFirstName))
    const allCountries = new Set<CountryCode>()
    const occupations = new Set<Occupation>()
    const ul = this.toList(context, peopleList, pseudoPeopleList, allCountries, occupations)
    output.contents = context.file.contents.replace(`<!--#echo var="directories" -->`, ul.outerHTML)
    {
      let countriesHtml = "<div class='all'>"
      countriesHtml += `<label><input type="button" id="country-none" value="Aucun" onclick="setAll('country', false)"></label>`
      countriesHtml += `<label><input type="button" id="country-all" value="Tous" onclick="setAll('country', true)"></label>`
      countriesHtml += `</div>`
      for (const country of Array.from(allCountries).sort()) {
        const countryStr = context.messages.country[country].title
        countriesHtml += `<span class="option"><label><input type="checkbox" id="country-${country}" onchange="findPeople(event)"> ${countryStr}</label></span>`
      }
      output.contents = output.contents.replace(`<!--#echo var="countries" -->`,
        HtmlTag.toString("div", countriesHtml, {id: "countries"}))
    }
    {
      let occupationsHtml = "<div class='all'>"
      occupationsHtml += `<label><input type="button" id="occupation-none" value="Aucun" onclick="setAll('occupation', false)"></label>`
      occupationsHtml += `<label><input type="button" id="occupation-all" value="Tous" onclick="setAll('occupation', true)"></label>`
      occupationsHtml += `</div>`
      for (const occupation of Array.from(occupations).sort()) {
        const occupationStr = StringUtil.capitalizeFirstLetter(
          context.messages.people.occupation[occupation](Gender.male))
        occupationsHtml += `<span class="option"><label><input type="checkbox" id="occupation-${occupation}" onchange="findPeople(event)"> ${occupationStr}</label></span>`
      }
      output.contents = output.contents.replace(`<!--#echo var="occupations" -->`,
        HtmlTag.toString("div", occupationsHtml, {id: "occupations"}))
    }
    await this.outputFunc(context, output)
  }

  protected toList(context: HtmlRR0SsgContext, peopleList: People[], pseudoPeopleList: People[],
                   allCountries: Set<CountryCode>, occupations: Set<Occupation>): HTMLUListElement {
    const file = context.file
    const listItems = peopleList.map(
      people => this.toListItem(context, people, pseudoPeopleList, allCountries, occupations))
    const ul = file.document.createElement("ul")
    ul.append(...listItems)
    ul.className = "links"
    return ul
  }

  protected toListItem(context: HtmlRR0SsgContext, people: People, pseudoPeopleList: People[],
                       allCountries: Set<CountryCode>, occupations: Set<Occupation>) {
    const ref = this.service.getLink(context, people, pseudoPeopleList, allCountries, occupations,
      /*this.filter*/ // TODO: Restore removal of already-known (as from people occupation subset) occupation
    )
    const item = context.file.document.createElement("li")
    item.appendChild(ref)
    return item
  }
}
