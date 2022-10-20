import {Util} from "../../util.js"
import {RecordReader} from "./RecordReader.js"

export class BinaryRecordReader extends RecordReader {
    constructor(buffer, logger) {
        super(buffer, logger)
        this.unknownOnly = true
    }

    get recordHex() {
        return this._recordHex
    }

    static readInt16LE(buffer, pos) {
        const byteA = buffer[pos + 1]
        const byteB = buffer[pos]
        const sign = byteA & (1 << 7)
        let int = (((byteA & 0xFF) << 8) | (byteB & 0xFF))
        if (sign) {
            int = 0xFFFF0000 | int
        }
        return int
    }

    static validString(str) {
        const invalidXmlChars = /[^\x09\x0A\x0D\x20-\xFF]/g
        return str ? str.replace(invalidXmlChars, " ") : ""
    }

    readed(l) {
        let max = this._recordPos + l
        for (; this._recordPos < max; ++this._recordPos) {
            let value = this._buffer[this._recordPos]
            this._recordHex += value < 0x10 ? "0" : ""
            this._recordHex += value.toString(16) + " "
        }
    }

    logReadPos(prop) {
        if (!this.unknownOnly || prop.startsWith("unknown")) {
            let pos = this._filePos + this._recordPos
            let value = this._record[prop]
            if (typeof value === "string") {
                value = `'${value}'`
            } else {
                value += ` (0x${value.toString(16)}, ${value.toString(2)})`
            }
            let logStr = `at ${pos} (0x${pos.toString(16)}) read ${prop}=${value}`
            this._logger.logDebug(logStr)
        }
    }

    readString(length, prop) {
        let str = ""
        for (let i = this._recordPos; i < this._recordPos + length; i++) {
            str += String.fromCharCode(this._buffer[i])
        }
        this._record[prop] = BinaryRecordReader.validString(Util.trimZeroEnd(str)).trim()
        this.logReadPos(prop)
        this.readed(length)
        return str
    }

    readByte(prop) {
        const byte = this._buffer[this._recordPos]
        this._record[prop] = byte
        this.logReadPos(prop)
        this.readed(1)
        return byte
    }

    readByteBits(prop1, size, prop2) {
        const byte = this._buffer[this._recordPos]
        this._record[prop1] = byte >> size
        this._record[prop2] = byte & ((1 << size) - 1)
        this.logReadPos(prop1)
        this.logReadPos(prop2)
        this.readed(1)
        return byte
    }

    readNibbles(prop1, prop2) {
        return this.readByteBits(prop1, 4, prop2)
    }

    readSignedInt(prop) {
        let sInt = BinaryRecordReader.readInt16LE(this._buffer, this._recordPos)
        this._record[prop] = sInt
        this.logReadPos(prop)
        this.readed(2)
        return sInt
    }

    read(filePos, recordIndex) {
        let record = super.read(filePos, recordIndex)
        this._recordHex = ""
        return record
    }
}

//# sourceMappingURL=BinaryRecordReader.js.map
