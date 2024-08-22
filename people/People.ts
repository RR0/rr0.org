import { Occupation } from "./Occupation"
import { StringUtil } from "../util/string/StringUtil"
import { Gender } from "@rr0/common"
import { CountryCode } from "../org/country/CountryCode"
import { RR0Data } from "../data/RR0Data"
import { RR0Event } from "../event/RR0Event"

export class People implements RR0Data {
  readonly type = "people"

  title: string

  name: string

  /**
   * The people actually doesn't exist.
   */
  hoax = false

  lastAndFirstName: string

  constructor(
    public firstNames: string[] = [],
    public lastName = "",
    readonly pseudonyms: string[] = [],
    readonly occupations: Occupation[] = [],
    readonly countries: CountryCode[] = [],
    /**
     * The people has been caught lying or has confessed a hoax.
     */
    readonly discredited = false,
    /**
     * @deprecated Use a "birth"-typed sub-data instead.
     */
    public birthTime?: Date,
    public deathTime?: Date,
    readonly gender?: Gender,
    readonly id = lastName + firstNames.join(""),
    readonly dirName?: string,
    public image?: string,
    readonly url?: string,
    readonly events: RR0Event[] = []
  ) {
    this.lastAndFirstName = this.getLastAndFirstName()
    this.title = this.firstAndLastName
    this.name = this.lastName
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

  clone(): People {
    return new People(
      this.firstNames,
      this.lastName,
      this.pseudonyms,
      this.occupations,
      this.countries,
      this.discredited,
      this.birthTime,
      this.deathTime,
      this.gender,
      this.id,
      this.dirName,
      this.image,
      this.url,
      this.events
    )
  }
}
