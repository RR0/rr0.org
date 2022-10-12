import {OutputFunc} from "../Ssg"
import {SsgContext} from "../SsgContext"
import {camelToText} from "../util/file/FileUtil"
import {HtmlTag} from "../util/HtmlTag"
import {FileInfo, getFileInfo} from "../util/file/FileInfo"
import {DirectoryStep} from "./DirectoryStep"
import {Gender} from "../model/people/Gender"
import {Occupation} from "../model/people/Occupation"
import {CountryCode} from "../model/place/CountryCode"
import {People} from "./People"

export class PeopleDirectoryStep extends DirectoryStep {

  constructor(dirs: string[], excludedDirs: string[], template: string, protected outputFunc: OutputFunc) {
    super(dirs, excludedDirs, template, outputFunc)
  }

  protected async processDirs(context: SsgContext, dirNames: string[], fileInfo: FileInfo) {
    let peopleList: People[] = []
    const countries = new Set<CountryCode>()
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
    peopleList = peopleList.filter(p => p.occupations.includes(Occupation.ufologist))
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
        if (occupation != Occupation.ufologist) {
          const occupationMsg = context.messages.people.occupation[occupation]
          if (!occupationMsg) {
            throw Error(`No message to translate occupation "${occupation}" in ${context.locales}`)
          }
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
    let countriesHtml = ""
    for (const country of countries) {
      countriesHtml += `<span class="option"><label>${context.messages.country[country]} <input type="checkbox" id="country-${country}" onchange="findCase(event)"></label></span>`
    }
    fileInfo.contents = fileInfo.contents.replace("${countries}", countriesHtml)
    await this.outputFunc(context, fileInfo, "")
  }
}
