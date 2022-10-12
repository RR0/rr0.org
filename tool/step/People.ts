import {Gender} from "../model/people/Gender"
import {CountryCode} from "../model/place/CountryCode"
import {Occupation} from "../model/people/Occupation"

export class People {
  gender?: Gender
  title?: string
  country?: CountryCode
  birthTime?: Date
  deathTime?: Date

  constructor(
    readonly dirName: string,
    readonly firstNames: string[] = [],
    public lastName = "",
    readonly pseudonyms: string[] = [],
    readonly occupations: Occupation[] = []
  ) {
  }

  get isDeceased(): boolean {
    return Boolean(this.deathTime)
  }

  get age(): number | undefined {
    if (this.birthTime) {
      let timeDelta: number
      if (this.deathTime) {
        timeDelta = this.deathTime.getTime() - this.birthTime.getTime()
      } else {
        const now = new Date().getTime()
        timeDelta = now - this.birthTime.getTime()
      }
      return Math.floor(timeDelta / 1000 / 60 / 60 / 24 / 365)
    }
  }
}
