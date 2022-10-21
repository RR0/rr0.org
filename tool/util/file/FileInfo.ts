import fs from "fs"
import {parse} from "node-html-parser"
import {detectEncoding, getCharSet, getContentType} from "./FileUtil"
import {SsgContext} from "../../SsgContext"

export interface FileInfo {
  name: string
  encoding: BufferEncoding
  contents: string
  lastModified: Date
  lang: string | string[]
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

function getContents(context: SsgContext, fileName: string) {
  const initialContents = fs.readFileSync(fileName, {encoding: "utf-8"})
  const html = parse(initialContents, {comment: true})
  const declaredEncoding = getCharSet(html) || getContentType(html)
  const detectedEncoding = detectEncoding(fileName)
  const encoding = declaredEncoding || detectedEncoding || "utf-8"
  const contents = fs.readFileSync(fileName, {encoding})
  return {encoding, contents}
}

export function getFileInfo(context: SsgContext, fileName: string): FileInfo {
  const fileStats = fs.statSync(fileName)
  const {encoding, contents} = getContents(context, fileName)
  const lang = getFileLang(context, fileName)
  return {name: fileName, encoding, contents, lastModified: fileStats.mtime, lang}
}
