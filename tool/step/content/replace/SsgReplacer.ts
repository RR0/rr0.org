export type ReplaceCall = (match: string, ...args: any[]) => string

export interface SsgReplacer {
  replacer: ReplaceCall
}
