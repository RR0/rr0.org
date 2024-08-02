import { ConsoleLogger } from "ssg-api"
import { CLI } from "../util/cli/CLI"
import { Book } from "./Book"
import { BookService } from "./BookService"
import { PeopleService } from "../people/PeopleService"
import { promise as glob } from "glob-promise"
import { DataService } from "../DataService"
import { RR0FileUtil } from "../util/file/RR0FileUtil"

interface BookImportArgs {
  import: string
  dry?: "true" | "false"
}

const logger = new ConsoleLogger("rr0-books")
const args = new CLI().getArgs<BookImportArgs>()
const fileName = args.import
const dry = args.dry === "true"
const fileNames = ["people.json"]
const dirs = fileNames.reduce((dirs, fileName) => dirs.concat(RR0FileUtil.findDirectoriesContaining(fileName)), [])
const dataService = new DataService(dirs, fileNames)

glob("people/*/*").then(peopleFiles => {
  const books = new BookService(logger, dry, new PeopleService(peopleFiles, dataService, peopleFactory), "out")
  books.import(fileName).then((result: Book[]) => {
      logger.log("Wrote", result.length, "books")
    }
  )
})
