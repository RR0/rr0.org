import { ConsoleLogger } from "ssg-api"
import { CLI } from "../util/cli/CLI"
import { Book } from "./Book"
import { BookService } from "./BookService"
import { PeopleService } from "../people/PeopleService"
import { promise as glob } from "glob-promise"

interface BookImportArgs {
  import: string
  dry?: "true" | "false"
}

const logger = new ConsoleLogger("rr0-books")
const args = new CLI().getArgs<BookImportArgs>()
const fileName = args.import
const dry = args.dry === "true"

glob("people/*/*").then(peopleFiles => {
  const books = new BookService(logger, dry, new PeopleService(peopleFiles, dataService))
  books.import(fileName).then((result: Book[]) => {
      logger.log("Wrote", result.length, "books")
    }
  )
})
