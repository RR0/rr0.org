import { Publication, Source } from "./Source"

export class OnlineSource extends Source {
  constructor(readonly url: URL, title: string, authors: string[], publication: Publication, subTitle?: string,
              series?: string) {
    super(title, authors, publication, subTitle, series)
  }
}
