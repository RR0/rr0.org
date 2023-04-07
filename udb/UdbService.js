var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value)
    })
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value))
      } catch (e) {
        reject(e)
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
import {Sources, Memory, UdbRecordFormatter} from "@rr0/udb"
import {Format, Query} from "./Query.js"

export class WebReadLine {
  createInterface(param) {
    param.input.then((text) => {
      this.data = text
      this.read()
    })
    return this
  }

  on(eventName, cb) {
    switch (eventName) {
      case "line":
        this.lineCb = cb
        break
      case "close":
        this.closeCb = cb
        break
      default:
    }
    return this
  }

  read() {
    this.pos = 0
    let end
    do {
      let index = this.data.indexOf("\n", this.pos + 1)
      end = index < 0
      if (end) {
        index = this.data.length
      }
      const line = this.data.substring(this.pos, index)
      this.lineCb(line)
      this.pos = index + 1
    } while (!end)
    this.closeCb()
  }
}

export class UdbService {
  constructor(logger, webFileInput, webReadLine) {
    this.logger = logger
    this.webFileInput = webFileInput
    this.webReadLine = webReadLine
    this.sources = new Sources()
    this.memory = new Memory()
    this.format = Format.memory
    this.firstIndex = 1
    this.maxCount = 1000000
    this.recordFormatter = new UdbRecordFormatter(this.sources)
  }

  load(sourcesFilename, dataFilename) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.loadSources(sourcesFilename)
      yield this.loadData(dataFilename)
    })
  }

  match(matchCriteria) {
    return __awaiter(this, void 0, void 0, function* () {
      const results = new Memory()
      yield new Query(this.memory, results, this.logger, null, this.format)
        .execute(matchCriteria, this.firstIndex, this.maxCount, false, false)
      return results
    })
  }

  loadSources(sourcesFilename) {
    return __awaiter(this, void 0, void 0, function* () {
      this.logger.logVerbose(`\nReading sources from #${sourcesFilename}:`)
      try {
        const response = yield fetch(sourcesFilename)
        if (response.ok) {
          const input = response.text()
          const sourcesReader = yield this.webReadLine.createInterface({input})
          yield this.sources.open(sourcesReader)
          this.logger.logVerbose("Reading sources:")
          this.logger.logVerbose(`- ${Object.keys(this.sources.primaryReferences).length} primary references`)
          this.logger.logVerbose(`- ${Object.keys(this.sources.newspapersAndFootnotes).length} newspapers and footnotes`)
          this.logger.logVerbose(`- ${Object.keys(this.sources.otherDatabasesAndWebsites).length} newspapers and footnotes`)
          this.logger.logVerbose(`- ${Object.keys(this.sources.otherPeriodicals).length} other periodicals`)
          this.logger.logVerbose(`- ${Object.keys(this.sources.misc).length} misc. books, reports, files & correspondance`)
          this.logger.logVerbose(`- ${this.sources.discredited.length} discredited reports`)
        }
      } catch (e) {
        throw Error(`Cannot load sources "${sourcesFilename}": ${e.message}`)
      }
    })
  }

  loadData(dataFilename) {
    return __awaiter(this, void 0, void 0, function* () {
      const firstIndex = 1
      this.logger.logVerbose(`\nReading cases from #${firstIndex}:`)
      yield this.webFileInput.open(dataFilename)
      yield new Query(this.webFileInput, this.memory, this.logger, this.recordFormatter, Format.memory)
        .execute(undefined, firstIndex, this.maxCount)
    })
  }
}

//# sourceMappingURL=UdbService.js.map
