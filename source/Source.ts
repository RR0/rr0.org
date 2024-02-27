export type Publication = {
  publisher: string
  time: string
}

export abstract class Source {
  protected constructor(
    readonly title: string, readonly authors: string[], readonly publication: Publication,
    readonly subTitle: string = undefined, readonly series: string = undefined,
    readonly summary: string = undefined, readonly dirName: string = undefined
  ) {
  }
}
