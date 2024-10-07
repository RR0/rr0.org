import * as fs from "fs"
import { FileUtil, Logger, SsgConfig } from "ssg-api"
import { TimeContext } from "../time/TimeContext.js"
import { TimeUrlBuilder } from "../time/TimeUrlBuilder.js"
import * as path from "path"
import { StringUtil } from "../util/string/StringUtil.js"
import { Book } from "./Book.js"
import { People } from "../people/People.js"
import { PeopleService } from "../people/PeopleService.js"
import { CSVFileReader } from "../CSVFileReader.js"

export class BookService {

  protected readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }

  protected peopleList: People[] = []

  constructor(readonly logger: Logger, protected dry: boolean, protected peopleService: PeopleService,
              protected config: SsgConfig) {
  }

  async import(fileName: string) {
    const COLUMN_YEAR_PUBLISHED = "Year Published"
    const COLUMN_TITLE = "Title"
    const COLUMN_PUBLISHER = "Publisher"
    const COLUMN_AUTHOR = "Author"
    const COLUMN_AUTHOR_LAST_FIRST = "Author (Last, First)"
    const COLUMN_ISBN = "ISBN"
    const COLUMN_SUBTITLE = "Subtitle"
    const COLUMN_SERIES = "Series"
    const COLUMN_SUMMARY = "Summary"
    const columns = [COLUMN_TITLE, "Original Title", COLUMN_SUBTITLE, COLUMN_SERIES, "Volume", COLUMN_AUTHOR, COLUMN_AUTHOR_LAST_FIRST, COLUMN_PUBLISHER, COLUMN_YEAR_PUBLISHED, "Original Year Published", "Genre", COLUMN_SUMMARY, "Number of Pages", "Language", COLUMN_ISBN, "Rating", "Notes", "Google VolumeID", "Uploaded Image URL"]
    const readStream = fs.createReadStream(fileName)
    const csvSeparator = ","
    const reader = new CSVFileReader<Record<string, string>>(readStream, this.logger, columns, csvSeparator)
    const results = await reader.read()
    const books: Book[] = []
    for (const result of results) {
      const timeStr = result[COLUMN_YEAR_PUBLISHED]
      const title = result[COLUMN_TITLE]
      if (timeStr) {
        const year = parseInt(timeStr, 10)
        const time = new TimeContext(year)
        const author = result[COLUMN_AUTHOR]
        const summary = result[COLUMN_SUMMARY]
        const authorLastFirst = result[COLUMN_AUTHOR_LAST_FIRST]
        const authorsNames = author ? author.split(",") : [authorLastFirst]
        const authors: People[] = []
        for (const authorName of authorsNames) {
          const author = await this.findPeople(authorName)
          if (author) {
            authors.push(author)
          }
        }
        const publisher = result[COLUMN_PUBLISHER]
        const authorsLastNames = authors.map(author => author.lastName)
        const titleStr = StringUtil.capitalizeFirstLetter(StringUtil.textToCamel(title.toLowerCase()))
        const publisherStr = StringUtil.capitalizeFirstLetter(StringUtil.textToCamel(publisher))
        let authorsStr = (authorsLastNames.length > 0 ? authorsLastNames : authorsNames.map(
          StringUtil.textToCamel)).join("-")
        let dirName: string
        const andAl = "-and-al"
        do {
          dirName = StringUtil.removeAccents(`${authorsStr}_${titleStr}_${publisherStr}`)
          if (dirName.length >= 255) {
            authorsStr = authorsStr.substring(0, authorsStr.length - andAl.length - 1) + andAl
          }
        } while (dirName.length >= 255)
        const parentDir = TimeUrlBuilder.fromContext(time)
        const bookDir = path.join(parentDir, dirName)
        const id = result[COLUMN_ISBN]
        const book: Book = {
          type: "book",
          events: [],
          previousSourceRefs: [],
          id,
          title,
          authors: authorsNames,
          subTitle: result[COLUMN_SUBTITLE],
          series: result[COLUMN_SERIES],
          publication: {time, publisher},
          dirName: bookDir,
          summary,
          variants: []
        }
        const authorDir = authors?.map(author => author.dirName)
        if (fs.existsSync(bookDir)) {
          this.logger.log("Book directory", bookDir, "already exists, with authors", authorDir)
        } else {
          this.logger.log("Creating book directory", bookDir, "with authors", authorDir)
          if (!this.dry) {
            fs.mkdirSync(bookDir)
          }
        }
        const filePath = path.join(bookDir, `book.json`)
        const bookJson = JSON.stringify(book, null, 2)
        if (!this.dry) {
          await FileUtil.writeFile(filePath, bookJson, "utf-8")
        }
        books.push(book)
      } else {
        this.logger.warn(title, "has no", COLUMN_YEAR_PUBLISHED)
      }
    }
    return books
  }

  protected async findPeople(fullName: string): Promise<People | undefined> {
    if (this.peopleList.length <= 0) {
      this.peopleList = await this.peopleService.getAll()
    }
    return this.peopleList.find(people => people.firstAndLastName === fullName)
  }
}
