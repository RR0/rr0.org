import { promise as glob } from "glob-promise"
import { TimeRenderer } from "./TimeRenderer"

export class TimeService {

  protected files: string[]
  protected _renderer: TimeRenderer

  get renderer(): TimeRenderer {
    return this._renderer
  }

  async getFiles(): Promise<string[]> {
    if (!this.files) {
      const minusYearFiles = await glob("time/-?/?/?/?/index.html")
      const year1Files = await glob("time/?/index.html")
      const year2Files = await glob("time/?/?/index.html")
      const year3Files = await glob("time/?/?/?/index.html")
      const year4Files = await glob("time/?/?/?/?/index.html")
      const monthFiles = await glob("time/?/?/?/?/??/index.html")
      const dayFiles = await glob("time/?/?/?/?/??/??/index.html")
      const files = this.files = year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
        minusYearFiles).concat(monthFiles).concat(dayFiles).sort()
      this._renderer = new TimeRenderer(files)
    }
    return this.files
  }

  async isTimeFile(filePath: string): Promise<boolean> {
    const files = await this.getFiles()
    return files.includes(filePath)
  }
}
