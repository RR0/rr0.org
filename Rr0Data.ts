export interface Rr0Data {
  /**
   * The directory where the data is stored, relatively to RR0's root.
   *
   * Should end with a trailing slash ("/").
   */
  dirName?: string

  type?: string

  supersededBy?: string
}
