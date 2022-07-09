"use strict"
Object.defineProperty(exports, "__esModule", {value: true})
exports.WebFileInput = void 0
var UdbRecordReader_1 = require("../input/db/udb/UdbRecordReader")
var RecordEnumerator_1 = require("../input/RecordEnumerator")
/**
 * A FileInput that reads from a webapp.
 */
var WebFileInput = /** @class */ (function () {
  /*@ngInject*/
  function WebFileInput(logger, $http) {
    this.logger = logger
    this.$http = $http
    this.filePos = 0
    this.recordSize = 112
  }

  WebFileInput.prototype.open = function (dataFile, whenDone) {
    var _this = this
    this.$http.get(dataFile, {responseType: "arraybuffer"}).then(function (response) {
      _this.fileData = response.data
      _this.fileSize = _this.fileData.byteLength
      // logDebug('File size=' + fileSize);
      _this.buffer = new Uint8Array(_this.fileData, _this.filePos, _this.recordSize)
      _this.recordReader = new UdbRecordReader_1.UdbRecordReader(_this.buffer, _this.logger)
      whenDone()
    })
  }
  WebFileInput.prototype.recordEnumerator = function (firstIndex, maxCount) {
    return new RecordEnumerator_1.RecordEnumerator(this, firstIndex, maxCount)
  }
  WebFileInput.prototype.goToRecord = function (recordIndex) {
    this.filePos = recordIndex * this.recordSize
  }
  WebFileInput.prototype.hasNext = function () {
    return this.filePos + (this.recordSize * 2) < this.fileSize
  }
  WebFileInput.prototype.readRecord = function (recordIndex) {
    var _this = this
    return new Promise(function (resolve, reject) {
      _this.getBuffer()
      var inputRecord = _this.recordReader.read(_this.filePos)
      inputRecord.id = recordIndex
      resolve(inputRecord)
    })
  }
  WebFileInput.prototype.close = function () {
  }
  WebFileInput.prototype.getBuffer = function () {
    this.buffer.set(new Uint8Array(this.fileData, this.filePos, this.recordSize))
  }
  return WebFileInput
}())
exports.WebFileInput = WebFileInput
//# sourceMappingURL=WebFileInput.js.map
