import {ReplacerFactory} from "../replace/ReplacerFactory"
import {SsgReplacer} from "../replace/SsgReplacer"
import {SsgContext} from "../SsgContext"
import {AnchorReplacer} from "./AnchorReplacer"

export class AnchorReplacerFactory implements ReplacerFactory {

  protected singleton?: AnchorReplacer

  async create(context: SsgContext): Promise<SsgReplacer> {
    const instance = await this.getInstance()
    return {
      replacer:
        /**
         * Replace time tags but urls.
         */
        (substring: string, ...args: any[]): string => {
          const timeStr = args[0]
          return instance.replacement(context, substring, timeStr)
        }
    }
  }

  protected async getInstance(): Promise<AnchorReplacer> {
    if (!this.singleton) {
      this.singleton = new AnchorReplacer()
    }
    return this.singleton
  }
}
