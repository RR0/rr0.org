export type RegexReplaceCallback = (match: string, ...args: any[]) => string

export interface RegexReplacer {
  replace: RegexReplaceCallback
}
