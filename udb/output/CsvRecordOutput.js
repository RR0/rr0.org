export class CsvRecordOutput {
  constructor(output, sortedRecord, params) {
    this.output = output
    this.sortedRecord = sortedRecord
    this.separator = ","
    if (params.separator) {
      this.separator = params.separator
    }
    const headerRecord = {}
    for (let prop in this.sortedRecord) {
      headerRecord[prop] = prop
    }
    this.output.write(this.desc(headerRecord) + "\n")
  }

  static csvValue(value) {
    if (typeof value === "string") {
      value = value.replace(/"/g, "\"\"")
      value = `"${value}"`
    }
    return value
  }

  desc(record) {
    let str = ""
    let sep = ""
    for (let prop in this.sortedRecord) {
      let value = record[prop]
      str += sep + CsvRecordOutput.csvValue(value)
      sep = this.separator
    }
    return str
  }

  getColumns(record) {
    return Object.keys(this.sortedRecord)
  }

  write(record) {
    this.output.write(this.desc(record) + "\n")
  }

  end() {
  }

  toString() {
    return `CVS output in ${this.output}`
  }
}

//# sourceMappingURL=CsvRecordOutput.js.map
