import * as fs from "fs"
import {promises as fsAsync} from "fs"
import {HTMLElement} from "node-html-parser"
import detectCharacterEncoding from "detect-character-encoding"
import path from "path"
import * as util from "util"
import {readdir} from "fs/promises"
import {FileInfo} from "./FileInfo"

const globCopy = util.promisify(require("copy"))

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
    if ((e as Error).message !== "Failed to detect charset.") {
      throw e
    }
  }
  return toBufferEncoding(guessedEncoding?.encoding)
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

export async function writeFile(fileInfo: FileInfo): Promise<void> {
  let fileName = fileInfo.name
  ensureDirectoryExistence(fileName)
  return fsAsync.writeFile(fileName, fileInfo.contents, {encoding: fileInfo.encoding})
}

export function camelToText(camel: string): string {
  const text = camel.trim()
    .replace(/([A-Z]+)/g, " $1")
    .replace(/([0-9]+)/g, " $1")
    .replace(/( [A-Z] )/g, " $1. ")
    .replace(/( [A-Z]$)/g, " $1.")
  return (text.charAt(0).toUpperCase() + text.slice(1)).trim()
}

export async function dirNames(dir: string): Promise<string[]> {
  const dirs = await readdir(dir, {withFileTypes: true})
  return dirs.filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

export async function ssgCopy(to: string, ...from: string[]): Promise<File[]> {
  return globCopy(from, to)
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

