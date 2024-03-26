import { ConsoleLogger } from "ssg-api"
import { CLI } from "../util/cli/CLI"
import { Book } from "./Book"
import { BookService } from "./BookService"
import { PeopleService } from "../people/PeopleService"
import { promise as glob } from "glob-promise"

const logger = new ConsoleLogger("rr0-books")
const args = new CLI().getArgs()
const fileName = args.import
const dry = args.dry === "true"

glob("people/*/*").then(peopleFiles => {
  const books = new BookService(logger, dry, new PeopleService(peopleFiles))
  books.import(fileName).then((result: Book[]) => {
      logger.log("Wrote", result.length, "books")
    }
  )
})
