import {Gender} from "./Gender"
import {Occupation} from "./Occupation"
import {CountryCode} from "../org/CountryCode"
import {StringUtil} from "../util/string/StringUtil"

export class People {
  /**
   * The people actually doesn't exist.
   */
  hoax = false

  title: string

  constructor(
    readonly dirName?: string,
    readonly firstNames: string[] = [],
    public lastName = "",
    readonly pseudonyms: string[] = [],
    readonly occupations: Occupation[] = [],
    readonly countries: CountryCode[] = [],
    /**
     * The people has been caught lying or has confessed a hoax.
     */
    readonly discredited = false,
    public birthTime?: Date,
    public deathTime?: Date,
    readonly gender?: Gender
  ) {
    if (firstNames?.length <= 0 && !lastName && dirName) {
      const lastSlash = dirName.lastIndexOf("/")
      const lastDir = dirName.substring(lastSlash + 1)
      const title = StringUtil.camelToText(lastDir)
      const firstSpace = title.indexOf(" ")
      this.title = firstSpace > 0 ? title.substring(0, firstSpace) + ", " + title.substring(
        firstSpace + 1) : title
    } else {
      this.title = StringUtil.camelToText(lastName) + (firstNames.length > 0 ? ", " + this.firstNames.join(" ") : "")
    }
  }

  get fullName(): string {
    return this.firstNames.join(" ") + " " + this.lastName
  }

  static toYears(timeMs: number) {
    return timeMs / 1000 / 60 / 60 / 24 / 365
  }

  static getUrl(lastName: string, firstNames: string[]): string {
    const normalizedLastName = StringUtil.removeAccents(lastName)
    const normalizedFirstNames = firstNames.map(StringUtil.removeAccents).map(StringUtil.withoutDots)
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
