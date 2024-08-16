import { RR0Data } from "./RR0Data"

/**
 * Instantiates RR0Data from (JSON) file contents.
 */
export interface RR0DataFactory<T extends RR0Data> {

  createFromData(data: RR0Data): T
}
