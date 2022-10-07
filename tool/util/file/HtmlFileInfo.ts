import {SsgContext} from "../../SsgContext"
import {FileInfo, getFileInfo} from "./FileInfo"

const jsdom = require("jsdom")
const {JSDOM} = jsdom

export interface HtmlFileInfo extends FileInfo {
  dom: any
  title: string
  titleUrl?: string
  author?: string
  copyright?: string
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
  let title: string
  const doc = dom.window.document
  let titleElem = doc.querySelector("title")
  if (titleElem) {
    title = titleElem.textContent.trim()
    const split = title.lastIndexOf(" - ")
    if (split > 0) {
      title = title.substring(0, split)
    }
  } else {
    title = fileName
  }
  const titleUrl = meta("url", doc)
  const author = meta("author", doc)
  const copyright = meta("copyright", doc)
  return {...fileInfo, title, titleUrl, author, copyright, dom}
}


