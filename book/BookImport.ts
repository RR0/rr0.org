import { ConsoleLogger, SsgConfig, SsgContext } from "ssg-api"
import { CLI } from "../util/cli/CLI.js"
import { Book } from "./Book.js"
import { BookService } from "./BookService.js"
import { PeopleService } from "../people/PeopleService.js"
import { AllDataService } from "../data/AllDataService.js"
import { PeopleFactory } from "../people/PeopleFactory.js"
import { RR0EventFactory } from "../event/RR0EventFactory.js"
import { TypedDataFactory } from "../data/TypedDataFactory.js"
import path from "path"

interface BookImportArgs {
  import: string
  dry?: "true" | "false"
}

const logger = new ConsoleLogger("rr0-books")
const args = new CLI().getArgs<BookImportArgs>()
const fileName = args.import
const dry = args.dry === "true"
const peopleFactory = new PeopleFactory(new RR0EventFactory())
const eventFactory = new RR0EventFactory()
const bookFactory = new TypedDataFactory<Book>(eventFactory, "book")
const dataService = new AllDataService([bookFactory, peopleFactory])

const outDir = "out"
const config: SsgConfig = {
  getOutputPath(context: SsgContext): string {
    return path.join(outDir, context.file.name)
  }
}
const books = new BookService(logger, dry, new PeopleService(dataService, peopleFactory), config)
books.import(fileName).then((result: Book[]) => {
    logger.log("Wrote", result.length, "books")
  }
)
