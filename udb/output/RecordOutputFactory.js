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
export var OutputFormat;
(function (OutputFormat) {
  OutputFormat[OutputFormat["xml"] = 0] = "xml"
  OutputFormat[OutputFormat["csv"] = 1] = "csv"
  OutputFormat[OutputFormat["memory"] = 2] = "memory"
})(OutputFormat || (OutputFormat = {}))

export class RecordOutputFactory {
  static getRecordOutput(formatSpec, output, sortedRecord) {
    return __awaiter(this, void 0, void 0, function* () {
      let recordOutput
      switch (formatSpec.format) {
        case OutputFormat.csv:
          const {CsvRecordOutput} = yield import("./CsvRecordOutput.js")
          recordOutput = new CsvRecordOutput(output, sortedRecord, formatSpec.params)
          break
        case OutputFormat.xml:
          const {XmlRecordOutput} = yield import("./XmlRecordOutput.js")
          recordOutput = new XmlRecordOutput(output, sortedRecord)
          break
        case OutputFormat.memory:
          const {MemoryRecordOutput} = yield import("./MemoryRecordOutput.js")
          recordOutput = new MemoryRecordOutput(output, sortedRecord, formatSpec.params)
          break
        default:
          const {UdbTextRecordOutput} = yield import("./db/udb/UdbTextRecordOutput.js")
          recordOutput = new UdbTextRecordOutput(output, formatSpec.params)
      }
      return recordOutput
    })
  }
}

//# sourceMappingURL=RecordOutputFactory.js.map
