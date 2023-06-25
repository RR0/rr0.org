import * as fs from "fs"
import {CSVFileReader} from "./CSVFileReader"
import {DefaultLogger, FileUtil, Logger} from "ssg-api"
import {TimeContext} from "./time/TimeContext"
import {TimeUrlBuilder} from "./time/TimeUrlBuilder"
import * as path from "path"
import {StringUtil} from "./util/string/StringUtil"
import {Book} from "./Book"
import {PeopleDirectoryStep} from "./people/PeopleDirectoryStep"
import {RR0SsgContext, RR0SsgContextImpl} from "./RR0SsgContext"
import {KnownPeople, People} from "./people/People"
import {RR0FileUtil} from "./util/file/RR0FileUtil"
import {CLI} from "./util/cli/CLI"

export class Books {

  protected readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }

  protected peopleList: People[] = []

  constructor(readonly logger: Logger, protected dry: boolean) {
  }

  protected async findPeople(context: RR0SsgContext, fullName: string): Promise<KnownPeople | undefined> {
    if (this.peopleList.length <= 0) {
      const peopleDirectories = await RR0FileUtil.findDirectoriesContaining("people*.json")
      this.peopleList = await PeopleDirectoryStep.getPeopleFromDirs(context, peopleDirectories)
    }
    return this.peopleList.find(people => people.firstAndLastName === fullName)
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
        const timeContext = new TimeContext(this.intlOptions, year)
        const author = result[COLUMN_AUTHOR]
        const summary = result[COLUMN_SUMMARY]
        const authorLastFirst = result[COLUMN_AUTHOR_LAST_FIRST]
        const authorsNames = author ? author.split(",") : [authorLastFirst]
        const authors: KnownPeople[] = []
        const context = new RR0SsgContextImpl("fr", new TimeContext(this.intlOptions))
        for (const authorName of authorsNames) {
          const authorFound = await this.findPeople(context, authorName)
          if (authorFound) {
            authors.push(authorFound)
          }
        }
        const publisher = result[COLUMN_PUBLISHER]
        const book: Book = {
          title,
          authors: authorsNames,
          publication: {time, publisher},
          summary
        }
        const isbn = result[COLUMN_ISBN]
        if (isbn) {
          book.isbn = isbn
        }
        const subTitle = result[COLUMN_SUBTITLE]
        if (subTitle) {
          book.subTitle = subTitle
        }
        const series = result[COLUMN_SERIES]
        if (series) {
          book.series = series
        }
        const authorsLastNames = authors.map(author => author.lastName).join("-")
        const dirName = (authorsLastNames.length > 0 ? authorsLastNames : authorsNames.map(StringUtil.textToCamel))
          + "_" + StringUtil.capitalizeFirstLetter(StringUtil.textToCamel(title.toLowerCase()))
          + "_" + StringUtil.capitalizeFirstLetter(StringUtil.textToCamel(publisher))
        const parentDir = TimeUrlBuilder.fromTimeContext(timeContext)
        const bookDir = path.join(parentDir, dirName)
        const authorStr = authors?.map(author => author.dirName)
        if (fs.existsSync(bookDir)) {
          logger.log("Book directory", bookDir, "already exists, with authors", authorStr)
        } else {
          logger.log("Creating book directory", bookDir, "with authors", authorStr)
          if (!dry) {
            fs.mkdirSync(bookDir)
          }
        }
        const filePath = path.join(bookDir, `book.json`)
        const bookJson = JSON.stringify(book, null, 2)
        if (!dry) {
          await FileUtil.writeFile(filePath, bookJson, "utf-8")
        }
        books.push(book)
      } else {
        this.logger.warn(title, "has no", COLUMN_YEAR_PUBLISHED)
      }
    }
    return books
  }
}

const logger = new DefaultLogger("rr0-books")
const args = new CLI().getArgs()
const fileName = args.import
const dry = Boolean(args.dry)

const books = new Books(logger, dry)
books.import(fileName).then((result: Book[]) => {
    logger.log("Wrote", result.length, "books")
  }
)
