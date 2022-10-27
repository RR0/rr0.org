export type RegexReplaceCallback = (substring: string, ...args: any[]) => string

export interface RegexReplacer {
  replace: RegexReplaceCallback
}
