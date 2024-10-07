import { ConsoleLogger, SsgConfig, SsgContext } from "ssg-api"
import { CLI } from "../util/cli/CLI.js"
import path from "path"
import {
  AllDataService,
  Book,
  BookService,
  PeopleFactory,
  PeopleService,
  RR0EventFactory,
  TypedDataFactory
} from "@rr0/cms"

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
