import {Gender} from "./Gender"
import {Occupation} from "./Occupation"
import {CountryCode} from "../org/CountryCode"
import {StringUtil} from "../util/string/StringUtil"

export class People {
  /**
   * The people actually doesn't exist.
   */
  hoax = false

  lastAndFirstName: string

  constructor(
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
    this.lastAndFirstName = this.getLastAndFirstName()
  }

  getLastAndFirstName(): string {
    const {lastNameStr, firstNameStr} = this.getLastAndFirstNames()
    return lastNameStr && firstNameStr ? lastNameStr + ", " + firstNameStr : lastNameStr || firstNameStr
  }

  get firstAndLastName(): string {
    const {lastNameStr, firstNameStr} = this.getLastAndFirstNames()
    return lastNameStr && firstNameStr ? firstNameStr + " " + lastNameStr : lastNameStr || firstNameStr
  }

  protected getLastAndFirstNames() {
    const lastNameStr = StringUtil.camelToText(this.lastName)
    const firstNameStr = this.firstNames.length > 0 ? this.firstNames.join(" ") : ""
    return {lastNameStr, firstNameStr}
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

export class KnownPeople extends People {
  constructor(firstNames: string[] = [],
              lastName = "",
              pseudonyms: string[] = [],
              occupations: Occupation[] = [],
              countries: CountryCode[] = [],
              discredited = false,
              birthTime?: Date,
              deathTime?: Date,
              gender?: Gender, readonly dirName?: string, public portraitUrl?: string) {
    super(firstNames, lastName, pseudonyms, occupations, countries, discredited, birthTime, deathTime, gender)
  }
}
