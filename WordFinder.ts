import { ConsoleLogger, HtmlFileContents, Logger } from "ssg-api"
import { promise as glob } from "glob-promise"
import { CLI } from "./util/cli/CLI"
import { CSVFileReader } from "./CSVFileReader"
import fs from "fs"
import { TimeContext } from "./time/TimeContext"
import { RR0SsgContextImpl } from "./RR0SsgContext"

interface WordFinderArgs {
  contents: string
  dict?: string
}

const logger = new ConsoleLogger("wordfinder")
const args = new CLI().getArgs<WordFinderArgs>()
const inputPattern = args.contents
const dictionaryFile = args.dict

class Dictionary {
  words: string[] = []

  constructor(protected logger: Logger) {
  }

  async read(fileName: string): Promise<string[]> {
    logger.debug("Reading", fileName)
    const columns = []
    const readStream = fs.createReadStream(fileName)
    const csvSeparator = ","
    const reader = new CSVFileReader<string>(
      readStream,
      logger,
      columns,
      csvSeparator,
      (data) => data["&"]
    )
    this.words = ["&"].concat(await reader.read())
    return this.words
  }
}

const timeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
}
const timeContext = new TimeContext(timeFormat)
const context = new RR0SsgContextImpl("fr", timeContext, "out")

glob(inputPattern).then(async (inputFiles) => {
  const dictionary = new Dictionary(logger)
  const dictWords = await dictionary.read(dictionaryFile)
  logger.debug("Looking for files", inputPattern)
  for (const inputFile of inputFiles) {
    const file = HtmlFileContents.read(context, inputFile)
    const contents = file.contents
    let pos: number
    let errorToFix: boolean
    const separators = " ;:.,!?()[]/+="
    const badChar = "�"
    do {
      pos = contents.indexOf(badChar)
      errorToFix = pos >= 0
      let fileWordStart = pos
      if (errorToFix) {
        while (fileWordStart > 0 && !separators.includes(contents.charAt(fileWordStart))) {
          fileWordStart--
        }
        let fileWordEnd = fileWordStart + 1
        while (!separators.includes(contents.charAt(fileWordEnd))) {
          fileWordEnd++
        }
        const wordToFix = contents.substring(fileWordStart, fileWordEnd)
        context.log("Fixing", wordToFix)
        let dictWordIndex = 0
        let score: number
        do {
          const dictWord = dictWords[dictWordIndex]
          let matchStart = 0
          score = 0
          for (let i = 0; i < dictWord.length; i++, matchStart++) {
            const dictWordChar = dictWord.charAt(i)
            const fileWordChar = contents.charAt(pos + matchStart)
            if (fileWordChar === badChar) {
              score += 5
            } else if (fileWordChar === dictWordChar) {
              score += 10
            } else if (separators.includes(fileWordChar)) {
              context.log("Found word", dictWord)
            } else {
              context.debug("Not word", dictWord)
              break
            }
          }
          dictWordIndex++
        } while (score < 10 && dictWordIndex < dictWords.length)
      }
    } while (errorToFix)
  }
})
