export class MemoryRecordOutput {
  constructor(output, sortedRecord, params) {
    this.output = output
    this.sortedRecord = sortedRecord
  }

  desc(record) {
    const sorted = {}
    for (let prop in this.sortedRecord) {
      if (this.sortedRecord.hasOwnProperty(prop)) {
        sorted[prop] = record[prop]
      }
    }
    return sorted
  }

  write(record) {
    this.output.write(this.desc(record))
  }

  end() {
  }

  toString() {
    return "Memory record output"
  }
}

//# sourceMappingURL=MemoryRecordOutput.js.map
