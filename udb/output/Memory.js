import {RecordEnumerator} from "../input/RecordEnumerator.js"

export class Memory {
    constructor() {
        this.records = []
    }

    hasNext() {
        return this.recordIndex < this.records.length - 1
    }

    readRecord() {
        return Promise.resolve(this.records[this.recordIndex])
    }

    goToRecord(recordIndex) {
        this.recordIndex = recordIndex
    }

    write(record) {
        this.records.push(record)
        return true
    }

    close() {
    }

    recordEnumerator(firstIndex, maxCount) {
        return new RecordEnumerator(this, firstIndex, maxCount)
    }

    toString() {
        return "Memory"
    }
}

//# sourceMappingURL=Memory.js.map
