import { ConsoleLogger, FileWriteConfig, SsgContext } from "ssg-api"
import path from "path"
import { Book, BookService, CLI, PeopleFactory, PeopleService, TimeServiceOptions, TimeUrlBuilder } from "@rr0/cms"
import { testFilePath } from "../test/RR0TestUtil"
import { AllDataService, RR0EventFactory, TypedDataFactory } from "@rr0/data"

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
const config: FileWriteConfig = {
  getOutputPath(context: SsgContext): string {
    return path.join(outDir, context.file.name)
  }
}
const timeOptions: TimeServiceOptions = {
  root: testFilePath("time"),
  files: []
}
const timeUrlBuilder = new TimeUrlBuilder({rootDir: timeOptions.root})
let files = []
const books = new BookService(logger, dry, new PeopleService(dataService, peopleFactory, files), timeUrlBuilder, config)
books.import(fileName).then((result: Book[]) => {
    logger.log("Wrote", result.length, "books")
  }
)
