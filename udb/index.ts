import {UdbController, Logger, WebFileInput, UdbService, WebReadLine} from "@rr0/udb"

const logger = new Logger(false, true)
const webFileInput = new WebFileInput(logger)
const webReadLine = new WebReadLine()
const udbService = new UdbService(logger, webFileInput, webReadLine)
var win = window as any
win.udbController = new UdbController(udbService, logger, "../data/udb/input/")
