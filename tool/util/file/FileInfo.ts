import fs from "fs"
import {detectEncoding, getCharSet, getContentType} from "./FileUtil"
import {SsgContext} from "../../SsgContext"

const jsdom = require("jsdom")
const {JSDOM} = jsdom

export class FileInfo {

  constructor(
    public name: string, readonly encoding: BufferEncoding, protected _contents: string, readonly lastModified: Date,
    readonly lang: string | string[]
  ) {
  }

  get contents(): string {
    return this._contents
  }

  set contents(value: string) {
    this._contents = value
  }
}

function getFileLang(context: SsgContext, filePath: string): string | string[] {
  let lang = context.locales
  const lastDot = filePath.lastIndexOf(".")
  let lastSlash = filePath.lastIndexOf("/")
  if (lastSlash < 0 || lastSlash < lastDot) {
    lastSlash = lastSlash < 0 ? 0 : lastSlash
    const fileName = filePath.substring(lastSlash, lastDot)
    const variantPos = fileName.lastIndexOf("_")
    if (variantPos > 0) {
      lang = [fileName.substring(variantPos + 1)]
    }
  }
  return lang
}

function getContents(context: SsgContext, fileName: string): {encoding: BufferEncoding, contents: string} {
  const initialContents = fs.readFileSync(fileName, {encoding: "utf-8"})
  let declaredEncoding
  if (fileName.endsWith(".html")) {
    const dom = new JSDOM(initialContents)
    const html = dom.window.document
    declaredEncoding = getCharSet(html) || getContentType(html)
  }
  const detectedEncoding = detectEncoding(fileName)
  const encoding: BufferEncoding = declaredEncoding || detectedEncoding || "utf-8"
  const contents = fs.readFileSync(fileName, {encoding})
  return {encoding, contents}
}

export function getFileInfo(context: SsgContext, fileName: string): FileInfo {
  const fileStats = fs.statSync(fileName)
  const {encoding, contents} = getContents(context, fileName)
  const lang = getFileLang(context, fileName)
  return new FileInfo(fileName, encoding, contents, fileStats.mtime, lang)
}
