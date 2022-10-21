import {UdbService, WebReadLine} from "./UdbService.js"
import {WebFileInput} from "./WebFileInput.js"
import {Logger} from "./Logger.js"
import {UdbController} from "./UdbController.js"

const logger = new Logger(false, true)
const webFileInput = new WebFileInput(logger)
const webReadLine = new WebReadLine()
const udbService = new UdbService(logger, webFileInput, webReadLine)
const win = window
win.udbController = new UdbController(udbService, logger, "./input/db/udb/data/")
//# sourceMappingURL=webUdb.js.map
