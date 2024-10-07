import { Datasource } from "./Datasource.js"
import { StringUtil } from "../../util/string/StringUtil.js"
import path from "path"
import fs from "fs"
import { FileContents, HtmlSsgContext } from "ssg-api"

export class FileSource {

  protected static readonly specialChars = /[ \-?!&*#().:\/\\;=°',]/g

  constructor(protected encoding: BufferEncoding) {
  }

  /**
   * Get the file name to read/write data from an external datasource.
   *
   * @param context
   * @param datasource
   * @protected
   */
  fileName(context: HtmlSsgContext, datasource: Datasource<any>): string {
    const authorsStr = datasource.authors.map(
      author => StringUtil.removeAccents(author).replace(FileSource.specialChars, "")).join("-")
    return path.join(path.dirname(context.file.name),
      authorsStr + "_" + StringUtil.removeAccents(datasource.copyright).replace(FileSource.specialChars, "-"))
  }

  async read(context: HtmlSsgContext, datasource: Datasource<any>): Promise<FileContents> {
    return FileContents.read(this.fileName(context, datasource), this.encoding)
  }

  writeContents(context: HtmlSsgContext, contents: string | NodeJS.ArrayBufferView, datasource: Datasource<any>) {
    const fileName = this.fileName(context, datasource)
    fs.writeFileSync(fileName, contents, {encoding: this.encoding})
  }
}
