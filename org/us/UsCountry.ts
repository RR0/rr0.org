import {Country, CountryMessages} from "../Country"
import {CountryCode} from "../CountryCode"
import {Organization} from "../index"
import {RR0SsgContext} from "../../RR0SsgContext"

export enum UsStateCode {
  /**
   * New Mexico.
   */
  nm = "nm",

  /**
   * TeNnessee
   */
  tn = "tn"
}

export interface UsCountryMessages extends CountryMessages {
  state: { [key in UsStateCode]: string }
}

export class UsState implements Organization {

  constructor(readonly code: UsStateCode, readonly dirName: string) {
  }

  title(context: RR0SsgContext): string {
    return context.messages.country.us.state[this.code]
  }
}

export class UsCountry extends Country<UsStateCode, UsState> {

  readonly stateDir = "state/"

  readonly states: { [key in UsStateCode]: UsState } = {
    nm: new UsState(UsStateCode.nm, this.stateDir + UsStateCode.nm + "/"),
    tn: new UsState(UsStateCode.tn, this.stateDir + UsStateCode.tn + "/")
  }

  constructor(dirName: string) {
    super(CountryCode.us, dirName)
  }

  level1(code: UsStateCode): UsState {
    return this.states[code]
  }
}
