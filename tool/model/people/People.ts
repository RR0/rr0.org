import {Gender} from "./Gender"
import {Occupation} from "./Occupation"
import {CountryCode} from "../place/CountryCode"
import {StringUtil} from "../../util/StringUtil"

export class People {

  gender?: Gender
  title?: string
  birthTime?: Date
  deathTime?: Date

  constructor(
    readonly dirName?: string,
    readonly firstNames: string[] = [],
    public lastName = "",
    readonly pseudonyms: string[] = [],
    readonly occupations: Occupation[] = [],
    readonly countries: CountryCode[] = []
  ) {
  }

  get fullName(): string {
    return this.firstNames.join(" ") + " " + this.lastName
  }

  static toYears(timeMs: number) {
    return timeMs / 1000 / 60 / 60 / 24 / 365
  }

  static getUrl(lastName: string, firstNames: string[]): string {
    const normalizedLastName = StringUtil.withoutAccents(lastName)
    const normalizedFirstNames = firstNames.map(StringUtil.withoutAccents).map(StringUtil.withoutDots)
    return "people/" + normalizedLastName.charAt(
      0).toLowerCase() + "/" + normalizedLastName + normalizedFirstNames.join("")
  }

  isDeceased(from?: Date): boolean {
    if (this.deathTime) {
      return true
    } else if (this.birthTime) {
      return this.probablyDead(this.birthTime, from)
    } else {
      return false
    }
  }

  getAge(from?: Date): number | undefined {
    if (this.birthTime) {
      let timeDelta: number
      if (this.deathTime) {
        timeDelta = this.deathTime.getTime() - this.birthTime.getTime()
      } else if (!this.probablyDead(this.birthTime)) {
        const now = from?.getTime() ?? new Date().getTime()
        timeDelta = now - this.birthTime.getTime()
      } else {
        return undefined
      }
      return Math.floor(People.toYears(timeDelta))
    }
  }

  probablyDead(birth: Date, at?: Date): boolean {
    const now = at?.getTime() ?? new Date().getTime()
    return People.toYears(now - birth.getTime()) > 120
  }
}
