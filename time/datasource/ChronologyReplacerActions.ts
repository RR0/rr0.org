export type ReadMethod = "backup" | "fetch"
export type WriteMethod = "backup" | "pages"

/**
 * The actions to perform when processing an external datasource.
 */
export type ChronologyReplacerActions = {
  readonly read: ReadMethod[]
  readonly write: WriteMethod[]
}
