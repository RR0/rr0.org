import * as fs from "fs"
import {promises as fsAsync} from "fs"
import {HTMLElement, parse} from "node-html-parser"
import detectCharacterEncoding from "detect-character-encoding"
import path from "path"

const fse = require("fs-extra")
export type FileInfo = {
  name: string
  encoding: BufferEncoding
  contents: string
  lastModified: Date
}

export function toBufferEncoding(encoding: string | undefined): BufferEncoding | undefined {
  switch (encoding?.toLowerCase()) {
    case "utf-8":
      return "utf-8"
    case "iso-8859-1":
    case "windows-1252":
      return "latin1"
    default:
      return encoding ? encoding as BufferEncoding : undefined
  }
}

export function detectEncoding(fileName: string): BufferEncoding | undefined {
  const fileBuffer = fs.readFileSync(fileName)
  let guessedEncoding = undefined
  try {
    guessedEncoding = detectCharacterEncoding(fileBuffer)
  } catch (e) {
    if (e.message !== "Failed to detect charset.") {
      throw e
    }
  } finally {
    return toBufferEncoding(guessedEncoding?.encoding)
  }
}

export function getCharSet(html: HTMLElement): BufferEncoding | undefined {
  let charSet: BufferEncoding | undefined
  const charsetEl = html.querySelector("html[charset]")
  if (charsetEl) {
    const charSetValue = charsetEl.getAttribute("charset")
    charSet = toBufferEncoding(charSetValue)
  }
  return charSet
}


function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

export async function writeFile(fileInfo: FileInfo) {
  let fileName = fileInfo.name
  ensureDirectoryExistence(fileName)
  return fsAsync.writeFile(fileName, fileInfo.contents, {encoding: fileInfo.encoding})
}

export function getFileInfo(fileName: string): FileInfo {
  try {
    const fileStats = fs.statSync(fileName)
    const initialContents = fs.readFileSync(fileName, {encoding: "utf-8"})
    const html = parse(initialContents, {comment: true})
    const declaredEncoding = getCharSet(html) || getContentType(html)
    const detectedEncoding = detectEncoding(fileName)
    const encoding = declaredEncoding || detectedEncoding || "utf-8"
    const contents = fs.readFileSync(fileName, {encoding})
    return {name: fileName, encoding, contents, lastModified: fileStats.mtime}
  } catch (e) {
    console.error(fileName, ":", e)
    throw e
  }
}

export async function copy(from: string, to: string): Promise<void> {
  return fse.copy(from, to)
}

export function getContentType(html: HTMLElement): BufferEncoding | undefined {
  let contentType: BufferEncoding | undefined
  const contentTypeEl = html.querySelector("meta[http-equiv='Content-Type']")
  if (contentTypeEl) {
    const content = contentTypeEl.getAttribute("content")
    if (content) {
      const values = content.split(";")
      if (values.length > 0) {
        let value = values[1]
        let key = "charset="
        let charsetPos = value.indexOf(key)
        if (charsetPos >= 0) {
          const charset = value.substring(charsetPos + key.length).toLowerCase().trim()
          contentType = toBufferEncoding(charset)
        }
      }
    }
  }
  return contentType
}

