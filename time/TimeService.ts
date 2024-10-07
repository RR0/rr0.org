import { TimeRenderer } from "./TimeRenderer.js"
import { TimeTextBuilder } from "./TimeTextBuilder.js"
import { AbstractDataService } from "../data/AbstractDataService.js"
import { RR0Event } from "../event/RR0Event.js"
import { AllDataService } from "../data/AllDataService.js"
import { glob } from "glob"

export class TimeService extends AbstractDataService<RR0Event> {

  protected _renderer: TimeRenderer

  constructor(dataService: AllDataService,
              readonly textBuilder: TimeTextBuilder) {
    super(dataService, null)
  }

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
      this._renderer = new TimeRenderer(files, this.textBuilder)
    }
    return this.files
  }

  async isTimeFile(filePath: string): Promise<boolean> {
    const files = await this.getFiles()
    return files.includes(filePath)
  }
}
