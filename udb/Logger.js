export class Logger {
  constructor(DEBUG = false, verbose = false, prefix) {
    this.DEBUG = DEBUG
    this.verbose = verbose
    this.prefix = prefix
    this.reset()
  }

  set autoFlush(value) {
    this._autoFlush = value
  }

  onLog(cb) {
    this.logCb = cb
  }

  onError(cb) {
    this.logError = cb
  }

  log(msg, lineFeed = true, withPrefix = true, cb = this.logCb) {
    while (msg.charAt(0) == "\n") {
      this.logMsg += "\n"
      msg = msg.substring(1)
    }
    this.logMsg += (withPrefix && this.prefix ? this.prefix : "") + msg + (lineFeed ? "\n" : "")
    if (this._autoFlush) {
      this.flush(cb)
    }
  }

  logDebug(msg) {
    if (this.DEBUG) {
      this.log("DEBUG: " + msg)
    }
  }

  error(msg) {
    this.flush()
    this.log(msg, true, true, this.logError)
    this.flush(this.logError)
  }

  logVerbose(msg, lineFeed = true) {
    if (this.verbose) {
      this.log(msg, lineFeed)
    }
    return this
  }

  reset() {
    this.logMsg = ""
  }

  flush(cb = this.logCb) {
    if (this.logMsg && cb) {
      cb(this.logMsg)
    }
    this.reset()
  }
}

//# sourceMappingURL=Logger.js.map
