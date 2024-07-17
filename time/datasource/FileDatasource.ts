import { HtmlRR0SsgContext } from "RR0SsgContext"
import { Datasource } from "./Datasource"

export interface FileDatasource<S> extends Datasource<S> {

  save(context: HtmlRR0SsgContext, fetched: any[], fetchTime: Date): void
}
