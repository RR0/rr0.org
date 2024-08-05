import { Article } from "./Article"
import { DefaultDataFactory } from "../DataService"
import { RR0Data } from "../RR0Data"

export class ArticleFactory extends DefaultDataFactory<Article> {

  constructor() {
    super("article")
  }

  protected createFromData(dirName: string, data: RR0Data): Article {
    const api = new Article(data.id, dirName, data.url, data.events)
    Object.assign(api, data)
    return api
  }
}
