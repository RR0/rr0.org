import * as json2xml from "json2xml"

export class XmlRecordOutput {
    constructor(output, sortedRecord) {
        this.output = output
        this.sortedRecord = sortedRecord
        this.output.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<udb>\n")
    }

    desc(record) {
        return json2xml(record).toString()
    }

    write(record) {
        const Record = {}
        for (let prop in this.sortedRecord) {
            Record[prop] = record[prop]
        }
        this.output.write(`<record>${this.desc(Record)}</record>\n`)
    }

    end() {
        this.output.write("</udb>")
    }

    toString() {
        return "XML output to " + this.output
    }
}

//# sourceMappingURL=XmlRecordOutput.js.map
