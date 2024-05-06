import { Source } from "./Source"

export interface OnlineSource extends Source {
  readonly url: URL
}
