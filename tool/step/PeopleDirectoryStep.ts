import {OutputFunc} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {HtmlTag} from "../util/HtmlTag"
import {FileInfo, getFileInfo} from "../util/file/FileInfo"
import {DirectoryStep} from "./DirectoryStep"
import {Gender} from "../model/people/Gender"
import {CountryCode} from "../model/org/CountryCode"
import {Occupation} from "../model/people/Occupation"
import {StringUtil} from "../util/string/StringUtil"
import {Time} from "../model/time/Time"
import {People} from "../model/people/People"
import {promise as glob} from "glob-promise"

/**
 * Scan directories for people information, then populates a template with collected data.
 */
export class PeopleDirectoryStep extends DirectoryStep {

  constructor(dirs: string[], excludedDirs: string[], template: string, protected outputFunc: OutputFunc,
              protected filterOccupations: Occupation[]) {
    super(dirs, excludedDirs, template, outputFunc)
  }

  protected async processDirs(context: SsgContext, dirNames: string[], fileInfo: FileInfo) {
    let peopleList: People[] = []
    const allCountries = new Set<CountryCode>()
    const occupations = new Set<Occupation>()
    for (const dirName of dirNames) {
      const files = await glob(`${dirName}/people*.json`)
      for (const file of files) {
        const people = new People(dirName)
        peopleList.push(people)
        try {
          const jsonFileInfo = getFileInfo(context, file)
          Object.assign(people, JSON.parse(jsonFileInfo.contents))
        } catch (e) {
          console.warn(`${dirName} has no index.json description`)
          // No json, just guess title.
        }
      }
    }
    peopleList = peopleList.filter((p: People) => p.occupations.some(o => this.filterOccupations.includes(o)))
    const pseudoPeopleList = peopleList.reduce((prev: People[], p: People) => {
      if (p.pseudonyms?.length > 0) {
        for (const pseudonym of p.pseudonyms) {
          const pseudo = new People(p.dirName, p.firstNames, p.lastName, p.pseudonyms, p.occupations, p.countries)
          pseudo.title = pseudonym
          prev.push(pseudo)
        }
      }
      return prev
    }, [])
    peopleList = peopleList.concat(pseudoPeopleList).sort((p1, p2) => p1.title.localeCompare(p2.title))
    const listItems = peopleList.map(people => {
      const dirName = people.dirName
      const attrs: { [name: string]: string } = {}
      const titles = []
      const classList = []
      const details: string[] = []
      if (pseudoPeopleList.indexOf(people) >= 0) {
        classList.push("pseudonym")
        titles.push("(pseudonyme)")
      }
      if (people.hoax) {
        classList.push("canular")
      }
      let birthTimeStr = people.birthTime as unknown as string
      if (birthTimeStr) {
        const birthTime = people.birthTime = Time.dateFromIso(birthTimeStr)
        birthTimeStr = birthTime.getFullYear().toString()
      }
      let deathTimeStr = people.deathTime as unknown as string
      if (deathTimeStr) {
        const deathTime = people.deathTime = Time.dateFromIso(deathTimeStr)
        deathTimeStr = deathTime.getFullYear().toString()
      }
      if (people.isDeceased()) {
        classList.push("deceased")
      }
      if (birthTimeStr || deathTimeStr) {
        const timeStr = birthTimeStr ? deathTimeStr ? birthTimeStr + "-" + deathTimeStr : birthTimeStr + "-" : "-" + deathTimeStr
        titles.push(timeStr)
      }
      const age = people.getAge()
      if (age) {
        titles.push(`${age} ans`)
      }
      const countries = people.countries
      if (countries) {
        for (const country of countries) {
          allCountries.add(country)
          const classificationLabel = context.messages.country[country]
          if (!classificationLabel) {
            throw new Error(`No label for country "${country}"`)
          }
          titles.push(classificationLabel)
          classList.push(`country-${country}`)
        }
      }
      const gender = people.gender || Gender.male
      for (const occupation of people.occupations) {
        if (this.filterOccupations.length > 1 || !this.filterOccupations.includes(occupation)) {
          occupations.add(occupation)
          const occupationMsg = context.messages.people.occupation[occupation]
          if (!occupationMsg) {
            throw Error(
              `No message to translate occupation "${occupation}" in ${context.locales}, as specified in ${people.dirName}/people*.json`)
          }
          classList.push(`occupation-${occupation}`)
          titles.push(occupationMsg(gender))
        }
      }
      const text: (string | string[])[] = [people.title]
      if (details.length > 0) {
        text.push(`(${details.join(", ")})`)
      }
      const a = HtmlTag.toString("a", text.join(" "), {href: `/${dirName}/`})
      if (titles.length) {
        attrs.title = titles.join(", ")
      }
      if (classList.length) {
        attrs.class = classList.join(" ")
      }
      return HtmlTag.toString("li", a, attrs)
    })
    const directoriesHtml = HtmlTag.toString("ul", listItems.join("\n"), {class: "links"})
    fileInfo.contents = fileInfo.contents.replace(`<!--#echo var="directories" -->`, directoriesHtml)
    {
      let countriesHtml = ""
      for (const country of Array.from(allCountries).sort()) {
        const countryStr = context.messages.country[country]
        countriesHtml += `<span class="option"><label><input type="checkbox" id="country-${country}" onchange="find(event)"> ${countryStr}</label></span>`
      }
      fileInfo.contents = fileInfo.contents.replace(`<!--#echo var="countries" -->`,
        HtmlTag.toString("div", countriesHtml, {id: "countries"}))
    }
    {
      let occupationsHtml = ""
      for (const occupation of Array.from(occupations).sort()) {
        const occupationStr = StringUtil.capitalizeFirstLetter(
          context.messages.people.occupation[occupation](Gender.male))
        occupationsHtml += `<span class="option"><label><input type="checkbox" id="occupation-${occupation}" onchange="find(event)"> ${occupationStr}</label></span>`
      }
      fileInfo.contents = fileInfo.contents.replace(`<!--#echo var="occupations" -->`,
        HtmlTag.toString("div", occupationsHtml, {id: "occupations"}))
    }
    await this.outputFunc(context, fileInfo, "")
  }
}
