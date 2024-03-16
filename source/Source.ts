export type Publication = {
  publisher: string
  time: string
}

export type Source = {
  readonly previousSourceRefs?: string[]
  readonly id?: string
  readonly title?: string
  readonly authors?: string[]
  readonly publication?: Publication
  readonly subTitle?: string
  readonly series?: string
  readonly summary?: string,
  readonly dirName?: string
}
