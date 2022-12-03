import {SsgContext} from "ssg-api"

export interface RegexReplacement<C extends SsgContext = SsgContext> {
  replacement(context: C, match: string, contents: string, attrs?: string): string
}
