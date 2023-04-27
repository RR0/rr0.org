import * as fs from "fs"
import {CSVFileReader} from "./CSVFileReader"
import {DefaultLogger, FileUtil, Logger} from "ssg-api"
import {TimeContext} from "./time/TimeContext"
import {TimeUrlBuilder} from "./time/TimeUrlBuilder"
import * as path from "path"
import {StringUtil} from "./util/string/StringUtil"

export interface Book {
  authors: string[]
  title: string
  publication: {
    time: string
    publisher: string
  }
  isbn?: string
}

export class Books {

  readonly timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }

  constructor(readonly logger: Logger) {
  }

  async import(fileName: string) {
    const COLUMN_YEAR_PUBLISHED = "Year Published"
    const COLUMN_TITLE = "Title"
    const COLUMN_PUBLISHER = "Publisher"
    const COLUMN_AUTHOR = "Author"
    const COLUMN_AUTHOR_LAST_FIRST = "Author (Last, First)"
    const COLUMN_ISBN = "ISBN"
    const columns = [COLUMN_TITLE, "Original Title", "Subtitle", "Series", "Volume", COLUMN_AUTHOR, COLUMN_AUTHOR_LAST_FIRST, COLUMN_PUBLISHER, COLUMN_YEAR_PUBLISHED, "Original Year Published", "Genre", "Summary", "Number of Pages", "Language", COLUMN_ISBN, "Rating", "Notes", "Google VolumeID", "Uploaded Image URL"]
    const readStream = fs.createReadStream(fileName)
    const csvSeparator = ","
    const reader = new CSVFileReader<Record<string, string>>(
      readStream,
      this.logger,
      columns,
      csvSeparator
    )
    const results = await reader.read()
    const books: Book[] = []
    for (const result of results) {
      const time = result[COLUMN_YEAR_PUBLISHED]
      const title = result[COLUMN_TITLE]
      if (time) {
        const year = parseInt(time, 10)
        const timeContext = new TimeContext(this.timeFormat, year)
        const author = result[COLUMN_AUTHOR]
        const authorLastFirst = result[COLUMN_AUTHOR_LAST_FIRST]
        const book: Book = {
          title,
          authors: author ? author.split(",") : [authorLastFirst],
          publication: {
            time,
            publisher: result[COLUMN_PUBLISHER]
          }
        }
        const isbn = result[COLUMN_ISBN]
        if (isbn) {
          book.isbn = isbn
        }
        const titleSlug = StringUtil.removeAccents(title.toLowerCase().replace(/[ .:;,\-+=*/#°@$€£%!?"'’]*/g, ""))
        const directory = TimeUrlBuilder.fromTimeContext(timeContext)
        const filePath = path.join(directory, `book-${titleSlug}.json`)
        const bookJson = JSON.stringify(book, null, 2)
        await FileUtil.writeFile(filePath, bookJson, "utf-8")
        books.push(book)
      } else {
        this.logger.warn(title, "has no", COLUMN_YEAR_PUBLISHED)
      }
    }
    return books
  }
}

const logger = new DefaultLogger("rr0-books")
const books = new Books(logger)
books.import("BookBuddy 2023-04-27 151836.csv").then((result: Book[]) => {
    logger.log("Wrote", result.length, "books")
  }
)
