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
import {MatchError, RecordMatcher} from "./match.js"
import {OutputFormat, RecordOutputFactory} from "./output/RecordOutputFactory.js"
import {Util} from "./util.js"

export var Format;
(function (Format) {
    Format["memory"] = "memory"
    Format["default"] = "default"
    Format["json"] = "json"
    Format["xml"] = "xml"
})(Format || (Format = {}))

export class Query {
    constructor(input, output, logger, recordFormatter, format) {
        this.input = input
        this.output = output
        this.logger = logger
        this.recordFormatter = recordFormatter
        this.format = format
    }

    execute(matchCriteria, firstIndex, maxCount, format = true, allowEmpty = true) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.logVerbose(`Querying...`)
            const processingStart = Date.now()
            const recordEnumerator = this.input.recordEnumerator(firstIndex, maxCount)
            try {
                const recordMatcher = new RecordMatcher(matchCriteria, allowEmpty)
                let output
                let count = 0
                while (recordEnumerator.hasNext()) {
                    let inputRecord = yield recordEnumerator.next()
                    if (recordMatcher.matches(inputRecord)) {
                        let outputRecord
                        if (!output) {
                            output = yield this.getOutput(inputRecord, format)
                            this.logger.logDebug(`Writing ${output}`)
                        }
                        if (format && this.recordFormatter) {
                            outputRecord = this.recordFormatter.formatData(inputRecord)
                        } else {
                            outputRecord = inputRecord
                        }
                        output.write(outputRecord)
                        count++
                        this.logger.flush()
                    } else {
                        this.logger.reset()
                    }
                }
                if (output) {
                    output.end()
                }
                const processingDuration = Date.now() - processingStart
                this.logger.autoFlush = true
                this.logger.logVerbose(`Found ${count} records in ${(processingDuration / 1000).toFixed(2)} seconds.`)
            } catch (e) {
                if (e instanceof MatchError) {
                    this.logger.error(e.message)
                }
            }
        })
    }

    getOutput(inputRecord, format) {
        let outputRecord
        if (format && this.recordFormatter) {
            outputRecord = this.recordFormatter.formatProperties(Util.copy(inputRecord))
        } else {
            outputRecord = inputRecord
        }
        let params = new URLSearchParams(this.format)
        const paramsStart = this.format.indexOf("?")
        let outputFormat = {
            format: OutputFormat[this.format.substring(0, paramsStart > 0 ? paramsStart : undefined).toLocaleLowerCase()],
            params
        }
        return RecordOutputFactory.getRecordOutput(outputFormat, this.output, outputRecord)
    }
}

//# sourceMappingURL=Query.js.map
