import { TimeContext } from "../../TimeContext"

export type BaseOvniFranceCase = {
  readonly caseNumber: number,
  readonly url: URL,
  readonly place: string,
  readonly depCode: string,
  readonly dateTime: TimeContext,
  readonly physicalEffect: boolean,
  readonly witnessEffect: boolean,
  readonly entities: boolean,
  readonly landing: boolean
}
