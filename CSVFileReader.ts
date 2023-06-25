import {Logger} from "ssg-api"

import csv from "csv-parser"

export class CSVFileReader<T> {
  protected values: T[] = []

  constructor(
    protected stream: any,
    protected logger: Logger,
    protected columnNames: string[],
    protected separator = ";"
  ) {
  }

  async read(): Promise<T[]> {
    if (this.values.length > 0) {
      this.logger.warn("Overwriting previously read values", this.values)
    }
    this.values = []
    const columnNames = this.columnNames
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return new Promise<T[]>((resolve, reject) => {
      const readValues = this.values
      self.stream
        .pipe(csv({separator: this.separator}))
        .on("headers", (headers: any) => {
          if (!columnNames.every((column) => headers.includes(column))) {
            reject(`Could not find column "${columnNames}" in header`)
            return
          }
        })
        .on("data", (data: any) => {
          const columnValue: any = {}
          for (const column of columnNames) {
            columnValue[column] = data[column]
          }
          readValues.push(columnValue as T)
        })
        .on("end", () => {
          this.logger.debug("Read", readValues)
          this.logger.debug("Read", readValues.length, "values")
          resolve(readValues)
        })
    })
  }
}
