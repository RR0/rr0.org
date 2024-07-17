import { Source } from "./Source"

/**
 * A source which is located on the Internet.
 */
export interface OnlineSource extends Source {
  readonly url: URL
}
