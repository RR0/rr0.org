import { Source } from "./Source"

export type OnlineSource = Source & {
  readonly url: URL
}
