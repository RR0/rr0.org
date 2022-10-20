export class RecordReader {
  constructor(_buffer, _logger) {
    this._buffer = _buffer
    this._logger = _logger
  }

  get record() {
    return this._record
  }

  get logger() {
    return this._logger
  }

  get buffer() {
    return this._buffer
  }

  get recordPos() {
    return this._recordPos
  }

  get filePos() {
    return this._filePos
  }

  read(filePos, recordIndex) {
    const record = this._record = this.createRecord(recordIndex)
    this._recordPos = 0
    this._filePos = filePos
    return record
  }

  createRecord(id) {
    return {id}
  }
}

//# sourceMappingURL=RecordReader.js.map
