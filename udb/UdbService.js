"use strict"
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
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = {
    label: 0, sent: function () {
      if (t[0] & 1) throw t[1]
      return t[1]
    }, trys: [], ops: []
  }, f, y, t, g
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this
  }), g

  function verb(n) {
    return function (v) {
      return step([n, v])
    }
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.")
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t
      if (y = 0, t) op = [op[0] & 2, t.value]
      switch (op[0]) {
        case 0:
        case 1:
          t = op
          break
        case 4:
          _.label++
          return {value: op[1], done: false}
        case 5:
          _.label++
          y = op[1]
          op = [0]
          continue
        case 7:
          op = _.ops.pop()
          _.trys.pop()
          continue
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0
            continue
          }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
            _.label = op[1]
            break
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1]
            t = op
            break
          }
          if (t && _.label < t[2]) {
            _.label = t[2]
            _.ops.push(op)
            break
          }
          if (t[2]) _.ops.pop()
          _.trys.pop()
          continue
      }
      op = body.call(thisArg, _)
    } catch (e) {
      op = [6, e]
      y = 0
    } finally {
      f = t = 0
    }
    if (op[0] & 5) throw op[1]
    return {value: op[0] ? op[1] : void 0, done: true}
  }
}
Object.defineProperty(exports, "__esModule", {value: true})
exports.UdbService = exports.WebReadLine = void 0
var Sources_1 = require("../input/db/udb/Sources")
var Memory_1 = require("../output/Memory")
var UdbRecordFormatter_1 = require("../output/db/udb/UdbRecordFormatter")
var Query_1 = require("../Query")
var WebReadLine = /** @class */ (function () {
  function WebReadLine() {
  }

  WebReadLine.prototype.createInterface = function (param) {
    var _this = this
    param.input.then(function (response) {
      _this.data = response.data
      _this.read()
    })
    return this
  }
  WebReadLine.prototype.read = function () {
    this.pos = 0
    var end
    do {
      var index = this.data.indexOf("\n", this.pos + 1)
      end = index < 0
      if (end) {
        index = this.data.length
      }
      var line = this.data.substring(this.pos, index)
      this.lineCb(line)
      this.pos = index + 1
    } while (!end)
    this.closeCb()
  }
  WebReadLine.prototype.on = function (eventName, cb) {
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
  return WebReadLine
}())
exports.WebReadLine = WebReadLine
var UdbService = /** @class */ (function () {
  /*@ngInject*/
  function UdbService(logger, webFileInput, $http, webReadLine) {
    this.logger = logger
    this.webFileInput = webFileInput
    this.$http = $http
    this.webReadLine = webReadLine
    this.sources = new Sources_1.Sources()
    this.memory = new Memory_1.Memory()
    this.format = "memory"
    this.firstIndex = 1
    this.maxCount = 1000000
    this.recordFormatter = new UdbRecordFormatter_1.UdbRecordFormatter(this.sources)
    logger.verbose = true
  }

  UdbService.prototype.load = function (sourcesFilename, dataFilename) {
    var _this = this
    this.loadSources(sourcesFilename, function () {
      _this.loadData(dataFilename)
    })
  }
  UdbService.prototype.loadSources = function (sourcesFilename, cb) {
    var _this = this
    this.logger.logVerbose("\nReading sources from #".concat(sourcesFilename, ":"))
    var sourcesReader = this.webReadLine.createInterface({
      input: this.$http.get(sourcesFilename)
    })
    this.sources.open(sourcesReader, function () {
      _this.logger.logVerbose("Reading sources:")
      _this.logger.logVerbose("- ".concat(Object.keys(_this.sources.primaryReferences).length, " primary references"))
      _this.logger.logVerbose("- ".concat(Object.keys(_this.sources.newspapersAndFootnotes).length, " newspapers and footnotes"))
      _this.logger.logVerbose("- ".concat(Object.keys(_this.sources.otherDatabasesAndWebsites).length, " newspapers and footnotes"))
      _this.logger.logVerbose("- ".concat(Object.keys(_this.sources.otherPeriodicals).length, " other periodicals"))
      _this.logger.logVerbose("- ".concat(Object.keys(_this.sources.misc).length, " misc. books, reports, files & correspondance"))
      _this.logger.logVerbose("- ".concat(_this.sources.discredited.length, " discredited reports"))
      cb()
    })
  }
  UdbService.prototype.loadData = function (dataFilename) {
    var _this = this
    var firstIndex = 1
    this.logger.logVerbose("\nReading cases from #".concat(firstIndex, ":"))
    this.webFileInput.open(dataFilename, function () {
      new Query_1.Query(_this.webFileInput, _this.memory, _this.logger, _this.recordFormatter, "memory")
        .execute(undefined, firstIndex, _this.maxCount)
    })
  }
  UdbService.prototype.match = function (matchCriteria) {
    return __awaiter(this, void 0, void 0, function () {
      var results
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            results = new Memory_1.Memory()
            return [4 /*yield*/, new Query_1.Query(this.memory, results, this.logger, null, this.format)
              .execute(matchCriteria, this.firstIndex, this.maxCount, false, false)]
          case 1:
            _a.sent()
            return [2 /*return*/, results]
        }
      })
    })
  }
  return UdbService
}())
exports.UdbService = UdbService
//# sourceMappingURL=UdbService.js.map
