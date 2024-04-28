import { Logger } from "ssg-api"

import csv from "csv-parser"
import fs from "fs"

export type ReadResultFactory<T> = (data: any) => T

export class CSVFileReader<T> {
  protected values: T[] = []

  constructor(
    protected stream: fs.ReadStream,
    protected logger: Logger,
    protected columnNames: string[],
    protected separator = ";",
    protected create: ReadResultFactory<T> = (data: any): T => {
      const obj = {}
      for (const column of columnNames) {
        obj[column] = data[column]
      }
      return obj as T
    }
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
          const columnValue = this.create(data)
          readValues.push(columnValue)
        })
        .on("end", () => {
          this.logger.debug("Read", readValues)
          this.logger.debug("Read", readValues.length, "values")
          resolve(readValues)
        })
    })
  }
}
