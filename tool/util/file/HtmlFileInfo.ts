import {SsgContext} from "../../SsgContext"
import {FileInfo, getFileInfo} from "./FileInfo"

const jsdom = require("jsdom")
const {JSDOM} = jsdom

export class HtmlFileInfo extends FileInfo {

  constructor(
    name: string, encoding: BufferEncoding, contents: string, lastModified: Date, lang: string | string[],
    public title?: string, readonly titleUrl?: string, readonly author?: string, public copyright?: string
  ) {
    super(name, encoding, contents, lastModified, lang)
  }

  _dom: typeof JSDOM | undefined

  get dom(): typeof JSDOM {
    if (!this._dom) {
      this._dom = new JSDOM(this._contents)
    }
    return this._dom
  }

  set dom(newDom: typeof JSDOM) {
    this._contents = newDom.serialize()
    this._dom = newDom
  }

  get contents(): string {
    return this._contents
  }

  set contents(value: string) {
    this._dom = undefined
    this._contents = value
  }
}

function meta(name: string, doc: Document): string | undefined {
  const metaElem = doc.querySelector(`meta[name='${name}']`) as HTMLMetaElement
  if (metaElem) {
    return metaElem.content
  }
}

export function getHtmlFileInfo(context: SsgContext, fileName: string): HtmlFileInfo {
  const fileInfo = getFileInfo(context, fileName)
  const fileContents = fileInfo.contents
  const dom = new JSDOM(fileContents)
  let title: string | undefined
  const doc = dom.window.document
  let titleElem = doc.querySelector("title")
  if (titleElem) {
    const elemTitle = titleElem.textContent.trim()
    const split = elemTitle.lastIndexOf(" - ")
    title = split > 0 ? elemTitle.substring(0, split) : elemTitle
  }
  const titleUrl = meta("url", doc)
  const author = meta("author", doc)
  const copyright = meta("copyright", doc)
  return new HtmlFileInfo(
    fileInfo.name, fileInfo.encoding, fileInfo.contents, fileInfo.lastModified, fileInfo.lang,
    title, titleUrl, author, copyright
  )
}


