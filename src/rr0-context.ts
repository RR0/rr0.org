import common, {Context, SelectorDirective} from "./common"

export class ContextModule {

  constructor() {
    common.directives.push(new class extends SelectorDirective {
      protected async handle(context: Context, el: HTMLElement) {
      }
    }(".place"))
    common.directives.push(new class extends SelectorDirective {
      protected async handle(context: Context, el: HTMLElement) {
      }
    }("time"))
  }
}

const context = new ContextModule()
export default context
