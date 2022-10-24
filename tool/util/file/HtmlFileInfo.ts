import {SsgContext} from "../../SsgContext"
import {FileInfo, getFileInfo} from "./FileInfo"

const jsdom = require("jsdom")
const {JSDOM} = jsdom

export class HtmlFileInfo extends FileInfo {

  constructor(
    name: string, encoding: BufferEncoding, contents: string, lastModified: Date, lang: string | string[],
    public title?: string | undefined, readonly titleUrl?: string, readonly authors: string[] = [],
    public copyright?: string | undefined,
    readonly relStart?: Link | undefined, readonly relContents?: Link | undefined, readonly relPrev?: Link | undefined,
    readonly relNext?: Link | undefined
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

function meta(name: string, doc: Document): string[] {
  const metaElems = doc.querySelectorAll(`meta[name='${name}']`)
  return Array.from(metaElems).map(metaElem => (metaElem as HTMLMetaElement).content)
}

enum LinkType {
  start = "start",
  contents = "contents",
  prev = "prev",
  next = "next"
}

export interface Link {
  type: LinkType
  text: string
  url: string
}

function link(rel: LinkType, doc: Document): Link | undefined {
  const linkElem = doc.querySelector(`link[rel='${rel}']`) as HTMLLinkElement
  if (linkElem) {
    return {text: linkElem.title, url: linkElem.href, type: rel}
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
  const titleUrl = meta("url", doc)[0]
  const authors = meta("author", doc)
  const copyright = meta("copyright", doc)[0]
  const relStart = link(LinkType.start, doc)
  const relContents = link(LinkType.contents, doc)
  const relPrev = link(LinkType.prev, doc)
  const relNext = link(LinkType.next, doc)
  return new HtmlFileInfo(
    fileInfo.name, fileInfo.encoding, fileInfo.contents, fileInfo.lastModified, fileInfo.lang,
    title, titleUrl, authors, copyright,
    relStart, relContents, relPrev, relNext
  )
}


