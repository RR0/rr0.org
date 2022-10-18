import {OutputFunc} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {camelToText} from "../util/file/FileUtil"
import {HtmlTag} from "../util/HtmlTag"
import {FileInfo, getFileInfo} from "../util/file/FileInfo"
import {DirectoryStep} from "./DirectoryStep"
import {Gender} from "../model/people/Gender"
import {CountryCode} from "../model/place/CountryCode"
import {People} from "./People"
import {Occupation} from "../model/people/Occupation"
import {StringUtil} from "../util/StringUtil"

export class PeopleDirectoryStep extends DirectoryStep {

  constructor(dirs: string[], excludedDirs: string[], template: string, protected outputFunc: OutputFunc,
              protected filterOccupations: Occupation[]) {
    super(dirs, excludedDirs, template, outputFunc)
  }

  protected async processDirs(context: SsgContext, dirNames: string[], fileInfo: FileInfo) {
    let peopleList: People[] = []
    const countries = new Set<CountryCode>()
    const occupations = new Set<Occupation>()
    for (const dirName of dirNames) {
      const peopleDir = new People(dirName)
      peopleList.push(peopleDir)
      try {
        const jsonFileInfo = getFileInfo(context, `${dirName}/index.json`)
        Object.assign(peopleDir, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        console.warn(e)
        // No json, just guess title.
      }
    }
    peopleList = peopleList.filter((p: People) => p.occupations.some(o => this.filterOccupations.includes(o)))
    const directoriesHtml = HtmlTag.toString("ul", peopleList.map(people => {
      if (!people.title) {
        const lastSlash = people.dirName.lastIndexOf("/")
        const lastDir = people.dirName.substring(lastSlash + 1)
        people.title = camelToText(lastDir)
      }
      const attrs: { [name: string]: string } = {}
      const titles = []
      const classList = []
      const details: string[] = []
      const country = people.country
      let timeTitle = ""
      const birthTimeStr = people.birthTime
      if (birthTimeStr) {
        const birthTime = people.birthTime = new Date(birthTimeStr)
        timeTitle = birthTime.getFullYear() + "-"
      }
      const deathTimeStr = people.deathTime
      if (deathTimeStr) {
        const deathTime = people.deathTime = new Date(deathTimeStr)
        timeTitle += "-" + deathTime.getFullYear()
        if (people.isDeceased) {
          classList.push("deceased")
        }
      }
      const age = people.age
      if (age) {
        titles.push(`${age} ans`)
      }
      if (timeTitle) {
        titles.push(timeTitle.replace("--", "-"))
      }
      if (country) {
        countries.add(country)
        const classificationLabel = context.messages.country[country]
        if (!classificationLabel) {
          throw new Error(`No label for country "${country}"`)
        }
        titles.push(classificationLabel)
        classList.push(`country-${country}`)
      }
      const gender = people.gender || Gender.male
      for (const occupation of people.occupations) {
        if (this.filterOccupations.length > 1 || !this.filterOccupations.includes(occupation)) {
          occupations.add(occupation)
          const occupationMsg = context.messages.people.occupation[occupation]
          if (!occupationMsg) {
            throw Error(`No message to translate occupation "${occupation}" in ${context.locales}`)
          }
          classList.push(`occupation-${occupation}`)
          titles.push(occupationMsg(gender))
        }
      }
      const text: (string | string[])[] = [people.title]
      if (details.length > 0) {
        text.push(`(${details.join(", ")})`)
      }
      const a = HtmlTag.toString("a", text.join(" "), {href: "/" + people.dirName + "/"})
      if (titles.length) {
        attrs.title = titles.join(", ")
      }
      if (classList.length) {
        attrs.class = classList.join(" ")
      }
      return HtmlTag.toString("li", a, attrs)
    }).join("\n"))
    fileInfo.contents = fileInfo.contents.replace("${directories}", directoriesHtml)
    {
      let countriesHtml = ""
      for (const country of Array.from(countries).sort()) {
        const countryStr = context.messages.country[country]
        countriesHtml += `<span class="option"><label><input type="checkbox" id="country-${country}" onchange="find(event)"> ${countryStr}</label></span>`
      }
      fileInfo.contents = fileInfo.contents.replace("${countries}",
        HtmlTag.toString("div", countriesHtml, {id: "countries"}))
    }
    {
      let occupationsHtml = ""
      for (const occupation of Array.from(occupations).sort()) {
        const occupationStr = StringUtil.capitalizeFirstLetter(
          context.messages.people.occupation[occupation](Gender.male))
        occupationsHtml += `<span class="option"><label><input type="checkbox" id="occupation-${occupation}" onchange="find(event)"> ${occupationStr}</label></span>`
      }
      fileInfo.contents = fileInfo.contents.replace("${occupations}",
        HtmlTag.toString("div", occupationsHtml, {id: "occupations"}))
    }
    await this.outputFunc(context, fileInfo, "")
  }
}
