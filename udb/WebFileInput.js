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
import {UdbRecordReader} from "./input/db/udb/UdbRecordReader.js"
import {RecordEnumerator} from "./input/RecordEnumerator.js"

export class WebFileInput {
    constructor(logger) {
        this.logger = logger
        this.filePos = 0
        this.recordSize = 112
    }

    open(dataFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(dataFile, {headers: {"User-Agent": "@rr0/udb", responseType: "arraybuffer"}})
            if (response.ok) {
                this.fileData = yield response.arrayBuffer()
                this.fileSize = this.fileData.byteLength
                this.buffer = new Uint8Array(this.fileData, this.filePos, this.recordSize)
                this.recordReader = new UdbRecordReader(this.buffer, this.logger)
            } else {
                throw Error(response.statusText)
            }
        })
    }

    recordEnumerator(firstIndex, maxCount) {
        return new RecordEnumerator(this, firstIndex, maxCount)
    }

    goToRecord(recordIndex) {
        this.filePos = recordIndex * this.recordSize
    }

    hasNext() {
        return this.filePos + (this.recordSize * 2) < this.fileSize
    }

    readRecord(recordIndex) {
        return new Promise((resolve, reject) => {
            this.getBuffer()
            let inputRecord = this.recordReader.read(this.filePos)
            inputRecord.id = recordIndex
            resolve(inputRecord)
        })
    }

    close() {
    }

    getBuffer() {
        this.buffer.set(new Uint8Array(this.fileData, this.filePos, this.recordSize))
    }
}

//# sourceMappingURL=WebFileInput.js.map
