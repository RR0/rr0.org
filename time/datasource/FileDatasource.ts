import { HtmlRR0SsgContext } from "RR0SsgContext.js"
import { Datasource } from "./Datasource.js"

export interface FileDatasource<S> extends Datasource<S> {

  save(context: HtmlRR0SsgContext, fetched: any[], fetchTime: Date): void
}
