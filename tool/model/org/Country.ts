import {CountryCode} from "./CountryCode"
import {SsgContext} from "../../SsgContext"

export interface CountryMessages {
  title: string
}

export abstract class Country<K, V> {

  protected constructor(readonly code: CountryCode, readonly dirName: string) {
  }

  title(context: SsgContext): string {
    return context.messages.country[this.code].title
  }

  abstract level1(code: K): V
}

