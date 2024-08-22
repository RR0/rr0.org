import { AllDataService } from "./AllDataService"
import { TypedDataFactory } from "./TypedDataFactory"
import { RR0Data } from "./RR0Data"
import { RR0Case } from "../science/crypto/ufo/enquete/dossier/RR0Case"
import { RR0FileUtil } from "../util/file/RR0FileUtil"

export abstract class AbstractDataService<T extends RR0Data> {
  protected files: string[]

  protected constructor(protected readonly dataService: AllDataService, protected factory: TypedDataFactory<T>) {
  }

  get type(): string {
    return this.factory.type
  }

  async get(path: string): Promise<RR0Case[] | undefined> {
    return this.dataService.getFromDir<RR0Case>(path, [this.type, undefined], [this.type + ".json"])
  }

  async getFiles(): Promise<string[]> {
    if (!this.files) {
      this.files = RR0FileUtil.findDirectoriesContaining(this.factory.fileNames[0] + ".json", "out")
    }
    return this.files
  }
}
